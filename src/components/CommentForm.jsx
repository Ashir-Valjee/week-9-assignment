import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function CommentForm({ myParams }) {
  const user = await currentUser();
  async function handleSubmit(formValues) {
    "use server";

    const formData = {
      first_name: user.firstName,
      comment: formValues.get("comment"),
      user_posts_id: myParams.id,
    };
    console.log(formData);

    await db.query(
      `INSERT INTO comments3(first_name, comment, user_posts_id) VALUES ($1,$2,$3)`,
      [formData.first_name, formData.comment, formData.user_posts_id]
    );

    revalidatePath(`/posts/${myParams.id}`);
    redirect(`/posts/${myParams.id}`);
    // window.location.reload();
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleSubmit}
          className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
        >
          <p className="font-semibold m-4">Please leave a comment</p>

          <label htmlFor="comment">Comment </label>
          <textarea
            type="text"
            name="comment"
            placeholder="please comment on the post ..."
            id="comment"
            required
            className="text-orange-600 p-1"
          />
          <button
            type="submit"
            className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1 border-green-800 border-2
            rounded-lg my-4"
          >
            Send Comment
          </button>
        </form>
      </div>
    </>
  );
}
