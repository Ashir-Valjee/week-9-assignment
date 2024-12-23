//!You can nest this route in any other route, if you want. The user should only see this route after being redirected from the sign-up page
//The sign-up page needs the following elements:
//connection with db
//auth() and userId
//a form to collect the user's profile data
//sql query to insert the user's data into the database
//we need to redirect the user to the homepage once they submit the profile form
//A suggestion: you could have a try and catch for your sql query

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default function createProfilePage() {
  async function handleSubmit(formValues) {
    "use server";
    const { userId } = await auth();

    const user = await currentUser();

    const formData = {
      clerk_id: user.id,
      username: user?.username,
      first_name: user.firstName,
      last_name: user.lastName,
      bio: formValues.get("bio"),
      image_src: formValues.get("image_src"),
    };
    console.log(formData);

    await db.query(
      `INSERT INTO user_profile (clerk_id,username,first_name,last_name,bio,image_src) 
      VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        formData.clerk_id,
        formData.username,
        formData.first_name,
        formData.last_name,
        formData.bio,
        formData.image_src,
      ]
    );

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleSubmit}
          className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
        >
          <label htmlFor="bio">Biography </label>
          <textarea
            type="text"
            name="bio"
            placeholder="Tell us about yourself..."
            id="bio"
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="image_src">Profile Image link </label>
          <input
            type="text"
            name="image_src"
            placeholder="please ensure you enter an image link"
            id="image_src"
            className="text-orange-600 p-1"
          />
          <button
            type="submit"
            className="border-green-800 border-4 bg-green-100 text-zinc-900 p-2 m-4 hover:bg-green-800 hover:text-green-50
          transition duration-300 ease-in-out rounded-lg"
          >
            Submit Profile Data
          </button>
        </form>
      </div>
    </>
  );
}
