import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import background1 from "@/../public/background1.png";
import styles from "@/app/homepage.module.css";

export default async function Homepage() {
  // const { userId } = await auth();

  // const user = await currentUser();
  // console.log(user);
  // console.log(user.firstName);
  // console.log(user.lastName);
  // console.log(user.emailAddresses[0].emailAddress);

  return (
    <>
      <div className={styles.container}>
        <Image
          alt="background image"
          src={background1}
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.backgroundImage}
        />
      </div>
    </>
  );
}
