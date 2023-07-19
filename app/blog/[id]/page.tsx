"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BlogContext } from "@/app/provider/BlogContext";
import { ApiStates, ReadBlogs } from "@/app/constants/texts/BlogHomeTextConstants";
import DateFormatter from "@/app/components/date";

export function ReadBlogPage(props: { id: string }) {
  const router = useRouter();

  const blogContext = useContext(BlogContext);
  const blog = blogContext?.blogs.find((blog) => blog.id === props.id);

  if (!blog) {
    return <h1 className="text-center">{ApiStates.notFound}</h1>;
  }

  const handleBackToHome = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-purple-700">
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-white">{ReadBlogs.title}</h1>
      </div>
      <div className="container mx-auto px-4 py-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4">{blog?.title}</h2>
          <p className="text-gray-600">
            <DateFormatter date={new Date(blog.date)} />
          </p>
          <p className="text-gray-600">{blog?.description}</p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-purple-800 text-white text-center">
        <button className="button" onClick={handleBackToHome}>
          {ReadBlogs.backToHome}
        </button>
      </div>
    </div>
  );
}

export default function WrappedReadBlogPage({ params }: { params: { id: string } }) {
  return <ReadBlogPage id={params.id} />;
}
