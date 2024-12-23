import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { dateConverter } from "@/utils/handyFunctions";
import CommentForm from "@/components/CommentForm";
import DisplayComments from "@/components/DisplayComments";
import { notFound } from "next/navigation";

export default async function IdPage({ params }) {
  const myParams = await params;
  const post = await db.query(
    `SELECT * FROM user_posts WHERE id=${myParams.id};`
  );
  const data = post?.rows[0];
  // console.log(data);

  if (!data) {
    notFound();
  }

  // ==============================
  // get clerk id and then name of post creator. I know there is an easier way of doing this but i wanted to try this way
  const my_clerkId = await db.query(
    `SELECT clerk_id FROM user_posts WHERE id=${myParams.id};`
  );
  const my_clerkId2 = my_clerkId.rows[0].clerk_id;
  console.log(my_clerkId2);

  const myName = await db.query(
    `SELECT first_name FROM user_profile WHERE clerk_id = '${my_clerkId2}' ;`
  );

  const myFirstName = myName.rows[0].first_name;
  console.log(myFirstName);

  // ===========================

  // =======================================================================

  return (
    <>
      <h2>post number {myParams.id}</h2>
      <div className="my-4 mx-2">
        <Link
          className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg my-10"
          href="/posts"
        >
          go back ...
        </Link>
      </div>
      <Link
        className="hover:scale-110 ease-in-out transition-transform duration-300 font-bold bg-green-100 w-fit p-1.5 border-green-800 border-4
            rounded-lg "
        href={`/posts/${myParams.id}/update`}
      >
        update post entry
      </Link>

      <section className="flex flex-col items-center">
        <h1 className="font-bold">
          Date of post&#58; {dateConverter(data.date)}
        </h1>
        <h1 className="font-bold">post author&#58; {myFirstName}</h1>
        <h2 className="font-bold">Topic&#58; {data.topic}</h2>
        <div className="flex flex-col items-center gap-4 p-6 w-[70vw] min-w-[350px]">
          <Image
            alt={data.topic}
            src={data.image_src}
            width={300}
            height={300}
            className=" border-green-800 border-4 rounded-2xl"
          />
          <p>{data.content}</p>
        </div>
      </section>
      <CommentForm myParams={myParams} />
      <DisplayComments myParams={myParams} />
    </>
  );
}
