
//import { prisma } from "@/lib/client";
//import prisma from "@/lib/client";

import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export const runtime = "nodejs";

const AddPost = async () => {
  const { userId } = await auth();

  const testAction = async (formData: FormData) => {
    "use server";

    // const { userId } = await auth();
    // if (!userId) {
    //   throw new Error("Usuário não autenticado");
    // }

    if (!userId) return;

    const desc = formData.get("desc") as string;

    try {
      const res = await prisma.post.create({
        data: {
          userId,
          desc,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      <Image
        src="https://images.pexels.com/photos/35565461/pexels-photo-35565461.jpeg"
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />

      <div className="flex-1">
        <form action={testAction} className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="desc"
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
