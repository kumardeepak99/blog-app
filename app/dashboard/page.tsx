"use client";

import { BlogHomeTextConstants } from "../constants/texts/BlogHomeTextConstants";

export default function DashboardPage() {
  return (
    <p className="flex flex-col items-center m-10">
      {BlogHomeTextConstants.aboutBlog}
    </p>
  );
}
