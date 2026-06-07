"use client";

import { createPost } from "@/lib/actions";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FiImage, FiVideo, FiX } from "react-icons/fi";
import { processUpload } from "@/lib/image-utils";
import { createClient } from "@/lib/supabase/client";

const AddPost = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [mediaName, setMediaName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState("");

  // Carrega avatar do usuário real
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from("users").select("avatar").eq("id", user.id).single().then(({ data }) => {
        if (data?.avatar) setAvatar(data.avatar);
      });
    });
  }, []);

  const handleMediaSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");

    if (isVideo) {
      setMediaBlob(file);
      setMediaName(file.name);
      setMediaType("video");
      setPreview(URL.createObjectURL(file));
    } else {
      // Comprime imagem ANTES do upload
      try {
        const { blob, previewUrl } = await processUpload(file, "feed");
        setMediaBlob(blob);
        setMediaName("image.webp");
        setMediaType("image");
        setPreview(previewUrl);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const triggerFilePicker = (accept: string) => {
    if (fileRef.current) {
      fileRef.current.accept = accept;
      fileRef.current.click();
    }
  };

  const clearMedia = () => {
    setPreview(null);
    setMediaBlob(null);
    setMediaType(null);
    setMediaName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (formData: FormData) => {
    if (mediaBlob) {
      formData.append("media", mediaBlob, mediaName || "media.webp");
    }
    setSubmitting(true);
    try {
      await createPost(formData);
      clearMedia();
      // Limpa o textarea
      const form = document.querySelector("form");
      if (form) {
        const textarea = form.querySelector("textarea");
        if (textarea) textarea.value = "";
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex gap-4 text-sm transition-colors">
      <Image
        src={avatar || "https://images.pexels.com/photos/12198960/pexels-photo-12198960.jpeg"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full shrink-0"
      />

      <div className="flex-1">
        <form action={handleSubmit} className="flex flex-col gap-3">
          <textarea
            placeholder="What's on your mind?"
            className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white rounded-lg p-3 outline-none resize-none min-h-[80px]"
            name="content"
            required
          />

          {preview && mediaType === "image" && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={clearMedia}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
              >
                <FiX size={16} />
              </button>
            </div>
          )}

          {preview && mediaType === "video" && (
            <div className="relative w-full rounded-lg overflow-hidden bg-black">
              <video src={preview} controls className="w-full max-h-60" />
              <button
                type="button"
                onClick={clearMedia}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
              >
                <FiX size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => triggerFilePicker("image/*")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
              >
                <FiImage size={20} />
                <span className="text-sm font-medium">Image</span>
              </button>
              <button
                type="button"
                onClick={() => triggerFilePicker("video/*")}
                className="flex items-center gap-2 text-purple-500 hover:text-purple-600 transition"
              >
                <FiVideo size={20} />
                <span className="text-sm font-medium">Video</span>
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleMediaSelect}
              className="hidden"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
