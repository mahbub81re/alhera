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
    const res = await fetch("/api/users");
    const data =await res.json();
       if(data.success){
        setUser(data.data);
       }
       setLoading(false)
    }
 
  
  
  
  return (
    <main className="flex min-h-screen flex-col w-full  ">

    </main>
  );
}
