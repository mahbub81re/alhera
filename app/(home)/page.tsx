"use client"
import DailyWork from "@/components/DailyWork";
import Syllebus from "@/components/Syllebus";
import { signOut, useSession  } from "next-auth/react";

import Image from "next/image";
import { useEffect, useState } from "react";




export default   function Home() {
const [loading, setLoading]=useState(false)
 const [user,setUser]  = useState({
  name:"",
  email:"",
  _id:"",
  class_type:"10",
  payment_due:0,
  payment_paid:0,
  presents:[],
  gender:"",
 });

  useEffect(()=>{
    getUser()
  },[])

  async function getUser(){
    setLoading(true)
    const res = await fetch("http://localhost:3000/api/users");
    const data =await res.json();
       if(data.success){
        setUser(data.data);
       }
       setLoading(false)
    }
 
  
  
  
  return (
    <main className="flex min-h-screen flex-col w-full  ">

      <div className="w-full h-[60px] bg-white flex flex-row  justify-between">
         <div className="">
            <Image src='/logo.png' height={40} width={160} alt="ff"/>
         </div>
         <div>
         <button className="px-3 py-2 text-white m-2 bg-red-500 rounded-md" onClick={() => signOut()}>Sign out</button> 
         </div>
      </div>
       <div className="w-full p-3">
       <div className="w-full  m-3 p-3 mx-auto bg-slate-200 dark:bg-slate-500 flex flex-row justify-start">
         <div>
          {user.gender!="" ? <Image src={user.gender==="female" ?"/female_avatar.jfif":"/male_avatar.jfif"} height={100} width={100} alt="Student"/>:<div className="w-[100px] h-[100px] flex flex-col justify-center text-gray-300"><div>Loading...</div></div>}
         </div>
         <div className="h-full  items-center flex flex-col justify-center relative">
           <div className=" px-2 flex flex-col text-sm"> 
            <span className="font-bold"> Name : {user.name}</span>
            <span> Id : {user.email}</span>
            <span> Class : {user.class_type}</span>
            <span> Due : {user.payment_due}</span>
            <span>Total Class : {}</span>
           </div>
          
         </div>
         
      </div> 
       </div>
      
        
       <div className="w-full p-3">
        <div className="w-full  p-3 mx-auto bg-slate-200 dark:bg-slate-500 flex flex-col justify-start">
        <DailyWork />
          </div>
          </div>
          <div className="w-full p-3">
        <div className="w-full  p-3 mx-auto bg-slate-200 dark:bg-slate-500 flex flex-col justify-start">
        <Syllebus />
         </div>
        </div>
      
    </main>
  );
}
