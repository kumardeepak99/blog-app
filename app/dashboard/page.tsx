"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { deleteUser } from "../store/features/userSlice";
import { useContext } from "react";
import BlogProvider, { BlogContext } from "../provider/BlogContext";
import Loading from "../loading";
import { BlogActions, BlogHomeTextConstants } from "../constants/texts/BlogHomeTextConstants";
import { Buttons } from "../constants/forms/AuthenticationTexts";
import DateFormatter from "../components/date";

export type Blog = {
  id: string;
  title: string;
  description: string;
  date: Date;
};

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const blogContext = useContext(BlogContext);

  const onLogoutClick = () => {
    dispatch(deleteUser());
    router.push("/");
  };

  const onAddBlogClick = () => {
    // Handle add blog logic
  };

  const handleReadBlog = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return blogContext?.isLoading ? (
    <Loading />
  ) : (
    <div className="bg-purple-700 min-h-screen">
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-white">{BlogHomeTextConstants.title}</h1>
        <div>
          <button className="button-green mr-2 text-white" onClick={onAddBlogClick}>
            {BlogActions.add}
          </button>
          <button className="button-red text-white" onClick={onLogoutClick}>
            {Buttons.logout}
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogContext?.blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-600">
                  <DateFormatter date={new Date(blog.date)} />
                </p>
                <p className="text-gray-600 mb-4">{blog.description.length > 50 ? `${blog.description.substr(0, 50)}...` : blog.description}</p>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue mr-2"
                  onClick={() => {
                    handleReadBlog(blog.id);
                  }}
                >
                  Read
                </button>
                <button className="bg-yellow mr-2">{BlogActions.edit}</button>
                <button className="bg-red">{BlogActions.delete}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
