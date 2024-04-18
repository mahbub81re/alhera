"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
type Student ={
    _id:String,
    name:String,
    email:String,
    payment_due:number,
    payment_paid:number,
    class_type:string,
    presents:[String],
    phone:String,
  } 

export default  function AllStudents(){

    const [students, setStudents]= useState<Student[] | []>([]);
    const [cFilter , setCFilter] =useState("no");
    useEffect(()=>{
       getStudents()
    },[])

    async function getStudents(){
        const res =await fetch("/api/students", {cache:"no-store"});
        const data = await res.json();
        if(data.success===false){
         //toast.error("Network Problem! please reload the page or check your connection");
         console.log("error")
        }else{
          setStudents(data.data)
          console.log(students)
        }
    }
     let i =0;
    return(
        <main>
              <div className="">
                <div>Table head <select   value={cFilter}  onChange={(e)=>setCFilter(e.target.value)} ><option value="no"  >No</option><option value="10" selected >Ten</option><option value="9" selected >Nine</option></select></div>
                <div>
                    {students.map((student:Student , index)=>{
                        i+=1;
                       return(
                       <div  key={index} className="m-3">
                          <table className="w-[800px] text-left">
                            {
                            
                            cFilter ==="no" && <tr>
                                <td className="w-[25px]">{i}</td>
                                <td className="w-[170px]">{student.name}</td>
                                <td className="w-[200px]">{student.email}</td>
                                <td className="w-[40px]">{student.payment_due}</td>
                                <td className="w-[40px]">{student.payment_paid}</td>
                                <td className="w-[40px]">{student.phone}</td>
                                <td className="w-[40px]">{student.presents.length}</td>
                                <td ><button>Edit</button></td>
                           </tr>
                           }

                        {cFilter !="no" && cFilter === student.class_type && <tr>
                                <td className="w-[25px]">{i}</td>
                                <td className="w-[170px]">{student.name}</td>
                                <td className="w-[200px]">{student.email}</td>
                                <td className="w-[40px]">{student.payment_due}</td>
                                <td className="w-[40px]">{student.payment_paid}</td>
                                <td className="w-[40px]">{student.phone}</td>
                                <td className="w-[40px]">{student.presents.length}</td>
                                <td ><button>Edit</button></td>
                           </tr>
                           }
                           </table>
                       </div>)
                    })}
                </div>
                <div>
                    <Link href="/sign-up">Add Student+</Link>
                </div>
              </div>
        </main>
    )
}