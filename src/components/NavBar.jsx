import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="flex flex-row align gap-8 items-center bg-amber-300 p-4 justify-center border-r shadow-">
        <Link
          className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
          href="/"
        >
          Home
        </Link>
        <Link
          className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
          href="/posts"
        >
          profile
        </Link>

        <Link
          className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
          href="/add-new-post"
        >
          add new post
        </Link>
        <Link
          className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
          href="/all-users"
        >
          All Users
        </Link>
      </nav>
    </>
  );
}
