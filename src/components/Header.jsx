//I am going to Clerk components here to manage my authentication tasks
//All of these components work in the server
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

//we are going to import auth() to have access to authentication credentails from the user
import { auth } from "@clerk/nextjs/server";
import NavBar from "./NavBar";

export default function Header() {
  //we can destructure the userId from clerk auth
  //this userId can be saved to your database, so you can match user with posts (one to many)
  const { userId } = auth();

  return (
    <>
      {/* when the user is signed in, i will show the user button */}
      <div className="bg-amber-300">
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* we only want to show the SignInButton and SignUpButton when the user is
      signed out */}
        <SignedOut>
          <SignInButton mode="modal">Sign In</SignInButton>
          <SignUpButton mode="modal">Sign Up</SignUpButton>
        </SignedOut>
        <h1 className="font-bold text-red-950 text-2xl">Welcome to TESN</h1>

        <NavBar />
      </div>
    </>
  );
}
