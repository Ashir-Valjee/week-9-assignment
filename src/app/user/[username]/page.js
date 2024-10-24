// if you want to use info from claerk
// auth() --->userId
// currentUser ----> username, email address

// the data i render here comes from two places:
// some comes from currentUser
// other data comes from user table (bio, other user data ...)

export default async function UserPage() {
  // const user = await currentUser
  return (
    <>
      <h1>user page</h1>
      {/* we can use optional chaining incase the user does not provide all the data we want to render */}
      {/* <h2> welcome {user?.firstName}</h2> */}

      <p>{user.emailAddresses[0].emailAddresses}</p>
    </>
  );
}
