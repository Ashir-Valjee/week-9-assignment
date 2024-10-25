import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Homepage() {
  const { userId } = await auth();

  const user = await currentUser();
  // console.log(user);
  // console.log(user.firstName);
  // console.log(user.lastName);
  // console.log(user.emailAddresses[0].emailAddress);

  return (
    <>
      <h1>homepage</h1>
      {/* <p>{user?.id}</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
      <p>{user?.emailAddresses[0].emailAddress}</p>
      <p>{user?.username}</p> */}
    </>
  );
}
