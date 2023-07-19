import axios, { AxiosResponse } from "axios";
import { APIUrls } from "./ApiServiceConstants";

const BASE_URL = APIUrls.blogsUrl;

const handleRequest = async (request: Promise<AxiosResponse>): Promise<any> => {
  try {
    const response: AxiosResponse = await request;
    return response;
  } catch (error) {
    throw error;
  }
};

const BlogService = {
  addBlog: async (data: any): Promise<any> => {
    return handleRequest(axios.post(BASE_URL, data));
  },

  getBlogs: async (): Promise<any> => {
    return handleRequest(axios.get(BASE_URL));
  },

  getBlogById: async (data: any): Promise<any> => {
    return handleRequest(axios.get(BASE_URL + `/${data.id}`, data));
  },

  updateBlog: async (data: any): Promise<any> => {
    const url = BASE_URL + `/${data.id}`;
    return handleRequest(axios.put(url, data));
  },

  deleteBlog: async (id: any): Promise<any> => {
    const url = BASE_URL + `/${id}`;
    return handleRequest(axios.delete(url));
  },
};

export default BlogService;
