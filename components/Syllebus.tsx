"use client"

import { useEffect, useState } from "react";

type Syllebus= {
    _id: string,
    classType: string,
    content: string,
    contenttype:string,
    date:Date,
    createdAt:Date,
  }
  
  async function getSyllebus(){
    const res = await fetch("http://localhost:3000/api/syllebus",{cache:"reload"});
    const data =await res.json();
    return data.data;
    
  }

export default  function Syllebus(){

const [syllebuses, setSyll] = useState<Syllebus[]|[]>([])

useEffect(()=>{
  getsylle()
},[])
  async function getsylle(){
    const sykke:Syllebus[] = await getSyllebus();
    setSyll(sykke)
     }

    return(
        <div className="w-full p-3">
        <div className="w-full  p-3 mx-auto bg-slate-200 dark:bg-slate-500 flex flex-col justify-start">
           <div className=" border-b p-3 border-red-200 mb-2">Syllebus</div>
           <div>
           {syllebuses.map((t)=>{
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
 )
}