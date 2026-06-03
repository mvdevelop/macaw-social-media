"use client";

import { createPost } from "@/lib/actions";
import Image from "next/image";
import { useState, useRef } from "react";
import { FiImage, FiX } from "react-icons/fi";
import { getCurrentUser } from "@/lib/mock-data";

const AddPost = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const currentUser = getCurrentUser();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setPreview(null);
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (formData: FormData) => {
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      await createPost(formData);
      clearImage();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex gap-4 text-sm transition-colors">
      <Image
        src={currentUser.avatar}
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

          {preview && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image src={preview} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition"
              >
                <FiX size={16} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
            >
              <FiImage size={20} />
              <span className="text-sm font-medium">Add Image</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#0052FF] to-[#6825FF] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
