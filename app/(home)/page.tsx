"use client"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import axios from "axios";

type Work ={
  _id: string,
  classType: string,
  content: string,
  contenttype:string,
  createdAt:Date,
}
type Syllebus= {
  _id: string,
  classType: string,
  content: string,
  contenttype:string,
  date:Date,
  createdAt:Date,
}
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

    const [todayworks, setTodayWork] = useState <Work[] | []>([]);
    const [syllebus, setSyllebus] = useState <Syllebus[] | []>([]);

    useEffect(()=>{
      getUser()
  },[]);

    const getUser = async ()=>{
      const res = await fetch("/api/users",{cache:"reload"});
      const data = await res.json();
      if(data.success===true){
        setUser(data.data);
        get_products_by_cat(data.data.class_type)
        get_syllebus_by_c_type(data.data.class_type)
      }
      
    }


   
    async function get_products_by_cat(id:string){
      const res = await fetch("/api/daily-work?class_type="+id,{cache:"reload"});
      const data = await res.json();
      if(data.success===false){
       console.log(data);
      }else{
       setTodayWork(data.data)
      }
    }

    async function get_syllebus_by_c_type(id:string){
      const res = await fetch("/api/syllebus?class_type="+id,{cache:"reload"});
      const data = await res.json();
      if(data.success===false){
       console.log(data);
      }else{
        setSyllebus(data.data)
      }
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
       <div className="w-full  m-3 p-3 mx-auto bg-slate-200 dark:bg-slate-500 flex flex-row justify-start">
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
       <div className="w-full  p-3 mx-auto bg-slate-200 dark:bg-slate-500 flex flex-col justify-start">
          <div className=" border-b p-3 border-red-200 mb-2">{"Home Work"}</div>
          <div>
               {todayworks.map((t)=>{
                   const time: Date = new Date(t.createdAt);
                   const current: Date =new Date();
                   
                 return(<div key={t._id}>
                      <b >{time.getDate()===current.getDate()?"Today":time.getDay()+"-"+time.getMonth()+"-"+time.getFullYear()}</b>
                     
                        {t.contenttype==="text" && <div dangerouslySetInnerHTML={{ __html: t.content }} />} 
                      </div>)
               })}
          </div>
      </div> 
       </div>

       <div className="w-full p-3">
       <div className="w-full  p-3 mx-auto bg-slate-200 dark:bg-slate-500 flex flex-col justify-start">
          <div className=" border-b p-3 border-red-200 mb-2">Syllebus</div>
          <div>
          {syllebus.map((t)=>{
                   const time: Date = new Date(t.date);
                   const current: Date =new Date();
                   
                 return(<div key={t._id}>
                      <b >{time.getDate()===current.getDate()?"Today":time.getDate()+"-"+time.getMonth()+"-"+time.getFullYear()}</b>
                     
                        {t.contenttype==="text" && <div dangerouslySetInnerHTML={{ __html: t.content }} />} 
                      </div>)
               })}
          </div>
      </div> 
       </div>

    </main>
  );
}
