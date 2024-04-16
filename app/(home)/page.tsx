"use client"
import Image from "next/image";
import { signOut } from "next-auth/react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  ">

      <div className="w-full h-[60px] bg-white flex flex-row  justify-between">
         <div className="">
            <Image src='/logo.png' height={40} width={160} alt="ff"/>
         </div>
         <div>
         <button className="px-3 py-2 text-white m-2 bg-red-500 rounded-md" onClick={() => signOut()}>Sign out</button>
         </div>
      </div>
       <div className="w-full p-3">
       <div className="w-full  m-3 p-3 mx-auto bg-slate-200 flex flex-row justify-start">
         <div>
          <Image src="/female_avatar.jfif" height={100} width={100} alt="Student"/>
         </div>
         <div className="h-full  items-center flex flex-col justify-center relative">
           <div className="py-7 px-2 flex flex-col">
            <span>Name : Khadija Akter</span>
            <span>Class : 10</span>
           </div>
          
         </div>
         
      </div> 
       </div>
      

       <div className="w-full p-3">
       <div className="w-full  p-3 mx-auto bg-slate-200 flex flex-col justify-start">
          <div className=" border-b p-3 border-red-200 mb-2">Today's Work</div>
          <div>
              আজকে তোমাদের গণিতের ১.১ এর ১ম উদাহরণটি থাকলো ।
          </div>
      </div> 
       </div>

       <div className="w-full p-3">
       <div className="w-full  p-3 mx-auto bg-slate-200 flex flex-col justify-start">
          <div className=" border-b p-3 border-red-200 mb-2">Syllebus</div>
          <div>
             <div> <b>01/04/2024:</b> Math: 1.1 page:3 , English: Unit 1 lesson:2 Grammar: Tense</div>
          </div>
      </div> 
       </div>

    </main>
  );
}
