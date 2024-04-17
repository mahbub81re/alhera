"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
type Student ={
    _id:String,
    name:String,
    email:String,
    payment_due:number,
    payment_paid:number,
    presents:[String],
    phone:String,
  } 

export default  function AllStudents(){

    const [students, setStudents]= useState<Student[] | []>([])
    useEffect(()=>{
       getStudents()
    },[])

    async function getStudents(){
        const res =await fetch("/api/students",{cache:"reload"});
        const data = await res.json();
        if(data.success===false){
         //toast.error("Network Problem! please reload the page or check your connection");
         console.log("error")
        }else{
          setStudents(data.data)
          console.log(students)
        }
    }
    
    return(
        <main>
              <div className="">
                <div>Table head</div>
                <div>
                    {students.map((student:Student , index)=>{
                       return(
                       <div className="flex flex-row justify-around" key={index}>
                           <span>{student.name}</span>
                           <span>{student.email}</span>
                           <span>{student.payment_due}</span>
                           <span>{student.payment_paid}</span>
                           <span>{student.phone}</span>
                           <span>{student.presents.length}</span>
                           <span><button>Edit</button></span>
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