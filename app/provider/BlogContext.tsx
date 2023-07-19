import { ReactNode, createContext, useEffect, useState } from "react";
import { Blog } from "../dashboard/page";
import BlogService from "../apiServices/BlogService";
import { BlogToastConstants } from "../constants/toast/BlogToastConstants";
import { toast } from "react-toastify";

export type BlogContextType = {
  blogs: Blog[];
  isLoading: boolean;
  loadBlogsData: () => void;
};

export const BlogContext = createContext<BlogContextType | null>(null);

type BlogProviderProps = {
  children: ReactNode;
};

const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const loadBlogsData = () => {
    setIsLoading(true);
    BlogService.getBlogs()
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        toast.error(BlogToastConstants.internalServer);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadBlogsData();
  }, []);

  const blogContextValue: BlogContextType = {
    blogs,
    isLoading,
    loadBlogsData,
  };

  return <BlogContext.Provider value={blogContextValue}>{children}</BlogContext.Provider>;
};

export default BlogProvider;
