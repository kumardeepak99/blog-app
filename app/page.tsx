import Link from "next/link";
import { BlogHomeTextConstants } from "./constants/texts/BlogHomeTextConstants";

export default function Home() {
  return (
    <main>
      <section className="flex flex-col items-center container text-white">
        <h1 className="text-2xl font-bold mb-4">
          {BlogHomeTextConstants.title}
        </h1>
        <p className="text-center">{BlogHomeTextConstants.aboutBlog}</p>
        <p className="text-center">
          Please{" "}
          <Link href="/login" className="underline text-green-400">
            Login
          </Link>{" "}
          or{" "}
          <Link href="/register" className="underline text-green-400">
            Register
          </Link>{" "}
          to access the blog.
        </p>
      </section>
    </main>
  );
}
