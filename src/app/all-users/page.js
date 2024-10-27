import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import background2 from "@/../public/background2.png";
import styles from "@/app/posts/posts.module.css";

export default async function AllUsersPage() {
  const response = await db.query(`SELECT * FROM user_profile`);
  const data = response.rows;
  console.log(data);

  return (
    <>
      <div className={styles.container}>
        <Image
          alt="background image"
          src={background2}
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.backgroundImage}
        />
        <h1>List of all users</h1>
        <div className="flex flex-row gap-4 m-4 flex-wrap justify-center ">
          {data.map((user) => (
            <div
              className="max-w-xs min-w-72 border-4 border-green-700 p-4 rounded-lg bg-green-50"
              key={user.id}
            >
              <Link
                className="font-bold hover:scale-110 ease-in-out transition-transform duration-300 z-10 inline-block p-1"
                href={`/all-users/${user.clerk_id}`}
              >
                user&#58; {user.first_name} {user.last_name}
              </Link>
              <p>{user.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
