"use client"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
   const {data} = useSession();
    const [user,setUser]= useState({
      name:"",
      email:"",
      _id:"",
      class_type:"",
      payment_due:0,
      payment_paid:0,
      presents:[],
      gender:"",
    })

    useEffect(()=>{
      getUser()
    },[])

    const getUser = async ()=>{
      const res = await axios.get("/api/users");
      console.log(res.data)
      setUser(res.data.data);
    }
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
          {user.gender!="" ? <Image src={user.gender==="female" ?"/female_avatar.jfif":"/male_avatar.jfif"} height={100} width={100} alt="Student"/>:<div className="w-[100px] h-[100px] flex flex-col justify-center text-gray-300"><div>Loading...</div></div>}
         </div>
         <div className="h-full  items-center flex flex-col justify-center relative">
           <div className=" px-2 flex flex-col text-sm">
            <span className="font-bold"> Name : {data?.user?.name}</span>
            <span> Id : {data?.user?.email}</span>
            <span> Class : {user.class_type}</span>
            <span> Due : {user.payment_due}</span>
            <span>Total Class : {user.presents.length}</span>
           </div>
          
         </div>
         
      </div> 
       </div>
      

       <div className="w-full p-3">
       <div className="w-full  p-3 mx-auto bg-slate-200 flex flex-col justify-start">
          <div className=" border-b p-3 border-red-200 mb-2">{"Today's Work"}</div>
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
