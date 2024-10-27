import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dateConverter } from "@/utils/handyFunctions";

export default function UpdateForm({
  id,
  clerk_id,
  topic,
  content,
  date,
  image_src,
}) {
  async function handleUpdate(formValues) {
    "use server";

    const formData = {
      clerk_id: clerk_id,
      topic: formValues.get("topic"),
      content: formValues.get("content"),
      date: formValues.get("date"),
      image_src: formValues.get("image_src"),
    };
    console.log(formData);

    await db.query(
      `UPDATE user_posts SET clerk_id = $1, topic = $2, content = $3, date = $4, image_src = $5 WHERE id = $6 RETURNING *`,
      [
        formData.clerk_id,
        formData.topic,
        formData.content,
        formData.date,
        formData.image_src,
        id,
      ]
    );

    revalidatePath(`/posts${id}`);
    redirect(`/posts/${id}`);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <form
          action={handleUpdate}
          className="flex flex-col items-center bg-green-50 w-80 my-8 border-4 border-green-700 p-4 rounded-lg"
        >
          <label htmlFor="topic">Topic </label>
          <input
            type="text"
            name="topic"
            placeholder="what is the topic of your post?"
            id="topic"
            defaultValue={topic}
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="content">Content </label>
          <textarea
            type="text"
            name="content"
            placeholder="enter your blog post here..."
            id="content"
            defaultValue={content}
            required
            className="text-orange-600 p-1"
          />
          <label htmlFor="date">Date </label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={dateConverter(date)}
            required
            className="text-orange-600 p-1"
          />

          <label htmlFor="image_src">blog post Image link </label>
          <input
            type="text"
            name="image_src"
            placeholder="enter an image link"
            id="image_src"
            defaultValue={image_src}
            className="text-orange-600 p-1"
          />
          <button
            type="submit post"
            className="border-green-800 border-4 bg-green-100 text-zinc-900 p-2 m-4 hover:bg-green-800 hover:text-green-50
          transition duration-300 ease-in-out rounded-lg"
          >
            update blog post
          </button>
        </form>
      </div>
    </>
  );
}
