import { Links } from "@/app/constants/forms/AuthenticationTexts";
import { BlogHomeTextConstants } from "@/app/constants/texts/BlogHomeTextConstants";
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Home />, {});
  });

  it("should have a blog title", () => {
    const titleText = screen.getByText(BlogHomeTextConstants.title);
    expect(titleText).toBeInTheDocument();
  });

  it("should have about blog", () => {
    const aboutBlogText = screen.getByText(BlogHomeTextConstants.aboutBlog);
    expect(aboutBlogText).toBeInTheDocument();
  });

  it("should renders a link to login page", () => {
    const loginLink = screen.getByRole("link", {
      name: Links.loginLink,
    });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute("href")).toBe("/login");
  });

  it("should renders a link to register page", () => {
    const registerLink = screen.getByRole("link", {
      name: Links.registerLink,
    });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute("href")).toBe("/register");
  });
});
