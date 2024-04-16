"use client"
import Image from "next/image";
import { signOut } from "next-auth/react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">

      <div className="w-full h-[60px] bg-white flex flex-row  justify-between">
         <div className="">
            <Image src='/logo.png' height={40} width={160} alt="ff"/>
         </div>
         <div>
         <button onClick={() => signOut()}>Sign out</button>
         </div>
      </div>


    </main>
  );
}
