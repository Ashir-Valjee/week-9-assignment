// app/posts/not-found.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NotFound() {
  return (
    <div>
      <h2>Sorry but we could not find that post</h2>

      <Link href="/posts">Return to profile page</Link>
    </div>
  );
}
