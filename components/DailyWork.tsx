
import { useEffect, useState } from "react";

type Work ={
    _id: string,
    classType: string,
    content: string,
    contenttype:string,
    createdAt:Date,
  }
    
export default   function DailyWork(){
        const [dailyworks,setD]=useState<Work[]|[]>([])
     useEffect(()=>{
      getDailyWork()
     },[])

      async function getDailyWork() {
      const res = await fetch("/api/daily-work",{cache:"no-store"});
      const data =await res.json();
      if(data.success===true)setD(data.data);
      
    }
  
      
    return(
        <>
           <div className=" border-b p-3 border-red-200 mb-2">{"Home Work"}</div>
           <div>
                {dailyworks.map((t:Work)=>{
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