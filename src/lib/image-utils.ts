// /src/lib/image-utils.ts
// Otimização de imagens client-side para reduzir storage e banda
// Converte para WebP, redimensiona e comprime ANTES do upload

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

interface ProcessOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1
}

// Avatares: 400x400, qualidade 0.8
const AVATAR_OPTS: ProcessOptions = { maxWidth: 400, maxHeight: 400, quality: 0.8 };
// Cover: 1200px width, qualidade 0.8
const COVER_OPTS: ProcessOptions = { maxWidth: 1200, quality: 0.8 };
// Feed: 1200px width, qualidade 0.85
const FEED_OPTS: ProcessOptions = { maxWidth: 1200, quality: 0.85 };

export function getProcessOptions(type: "avatar" | "cover" | "feed"): ProcessOptions {
  switch (type) {
    case "avatar": return AVATAR_OPTS;
    case "cover": return COVER_OPTS;
    case "feed": return FEED_OPTS;
  }
}

/**
 * Valida tamanho do arquivo antes do processamento
 */
export function validateFileSize(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is 1MB.`;
  }
  return null;
}

/**
 * Redimensiona, comprime e converte imagem para WebP
 * Retorna um Blob pronto para upload
 */
export async function processImage(
  file: File,
  type: "avatar" | "cover" | "feed"
): Promise<Blob> {
  const opts = getProcessOptions(type);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const canvas = document.createElement("canvas");
      let { width, height } = img;

      // Redimensiona mantendo aspect ratio
      if (opts.maxWidth && width > opts.maxWidth) {
        height = Math.round(height * (opts.maxWidth / width));
        width = opts.maxWidth;
      }
      if (opts.maxHeight && height > opts.maxHeight) {
        width = Math.round(width * (opts.maxHeight / height));
        height = opts.maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Converte para WebP com compressão
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to compress image"));
          }
        },
        "image/webp",
        opts.quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

/**
 * Processa um arquivo do input file e retorna o Blob otimizado + preview URL
 */
export async function processUpload(
  file: File,
  type: "avatar" | "cover" | "feed"
): Promise<{ blob: Blob; previewUrl: string; extension: string }> {
  const sizeError = validateFileSize(file);
  if (sizeError) throw new Error(sizeError);

  const blob = await processImage(file, type);
  const previewUrl = URL.createObjectURL(blob);

  return { blob, previewUrl, extension: "webp" };
}
