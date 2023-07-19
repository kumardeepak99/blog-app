import { render, act, waitFor } from "@testing-library/react";
import { useContext, useEffect } from "react";
import { mockBlogList } from "../../__fixtures__/blogs";
import BlogProvider, { BlogContext, BlogContextType } from "../../../provider/BlogContext";
import BlogService from "../../../apiServices/BlogService";
import { toast } from "react-toastify";
import { BlogToastConstants } from "@/app/constants/toast/BlogToastConstants";

jest.mock("../../../apiServices/BlogService");

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockBlogs = mockBlogList;

describe("Blog Provider", () => {
  test("isLoading should be true while loading blogs data and false when data is loaded", async () => {
    jest.spyOn(BlogService, "getBlogs").mockResolvedValue({ data: mockBlogs });

    let isLoadingValue: boolean | undefined;

    const TestComponent = () => {
      const blogContext = useContext<BlogContextType | null>(BlogContext);
      isLoadingValue = blogContext?.isLoading;
      return null;
    };

    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>
    );

    expect(isLoadingValue).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(isLoadingValue).toBe(false);
  });
});

describe("Blog Provider", () => {
  test("should load blogs data and set isLoading to false and check context value", async () => {
    jest.spyOn(BlogService, "getBlogs").mockResolvedValue({ data: mockBlogs });

    let blogContextValue: BlogContextType | null = null;

    const TestComponent = () => {
      const context = useContext(BlogContext);
      blogContextValue = context;
      return null;
    };

    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>
    );

    expect(blogContextValue).toEqual({ blogs: [], isLoading: true, loadBlogsData: expect.any(Function) });

    await waitFor(() => {
      expect(blogContextValue).toEqual({ blogs: mockBlogs, isLoading: false, loadBlogsData: expect.any(Function) });
    });
  });
});

describe("Blog Provider", () => {
  test("should display an error toast and set isLoading to false when fetching blogs fails", async () => {
    jest.spyOn(BlogService, "getBlogs").mockRejectedValue(new Error("Failed to fetch blogs"));

    let isLoadingValue: boolean | undefined;

    const TestComponent = () => {
      const blogContext = useContext<BlogContextType | null>(BlogContext);
      isLoadingValue = blogContext?.isLoading;
      return null;
    };

    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>
    );

    expect(isLoadingValue).toBe(true);

    await waitFor(() => {
      expect(isLoadingValue).toBe(false);
      expect(toast.error).toHaveBeenCalledWith(BlogToastConstants.internalServer);
    });
  });

  test("should load blogs data again when calling loadBlogsData and count number of calls", async () => {
    jest.spyOn(BlogService, "getBlogs").mockResolvedValue({ data: [] });

    let blogContextValue: BlogContextType | null = null;

    const TestComponent = () => {
      const context = useContext(BlogContext);
      blogContextValue = context;
      return null;
    };

    render(
      <BlogProvider>
        <TestComponent />
      </BlogProvider>
    );

    expect(BlogService.getBlogs).toHaveBeenCalledTimes(1);

    act(() => {
      blogContextValue?.loadBlogsData();
    });

    expect(BlogService.getBlogs).toHaveBeenCalledTimes(2);
  });
});
