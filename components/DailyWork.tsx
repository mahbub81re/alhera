"use client"

import { useEffect, useState } from "react";

type Work ={
    _id: string,
    classType: string,
    content: string,
    contenttype:string,
    createdAt:Date,
  }
    async function getDailyWork() {
        const res = await fetch("http://localhost:3000/api/daily-work",{cache:"reload"});
        const data =await res.json();
        return data.data;
      }

export default  function DailyWork(){
  const [dailyworks,setD]=useState<Work[] | [] >([])
  useEffect(()=>{
    getWork()
  },[])

  async function getWork(){
    const works:Work[] = await getDailyWork();
    setD(works);
  }

     // const dailyworks:Work[] = await getDailyWork(id);

    return(
        <>
           <div className=" border-b p-3 border-red-200 mb-2">{"Home Work"}</div>
           <div>
                {dailyworks.map((t)=>{
                    const time: Date = new Date(t.createdAt);
                    const current: Date =new Date();
                    
                  return(<div key={t._id}>
                       <b >{time.getDate()===current.getDate()?"Today":time.getDay()+"-"+time.getMonth()+"-"+time.getFullYear()}</b>
                      
                         {t.contenttype==="text" && <div dangerouslySetInnerHTML={{ __html: t.content }} />} 
                       </div>)
                })}
           </div>
      </> )
}