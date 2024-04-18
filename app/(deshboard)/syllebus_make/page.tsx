"use client"
import axios from "axios";
import { cache, useEffect, useState } from "react"

type Work ={
    _id: string,
    classType: string,
    content: string,
    contenttype:string,
    date:Date,
    createdAt:Date ,
  }

export default function SyllebusMake(){
    const [works,setWorks]= useState <Work[] | []>([]);
    useEffect(()=>{
        geAllworks()
    },[]);

    const [neww , seNeww] = useState({
        classType: "",
        content: "",
        contenttype:"text",
        date:"",
    });

    async function geAllworks() {
        const res=await fetch("/api/syllebus", {cache:"no-store"});
        const data =await res.json();
        if(data.success===true){
            setWorks(data.data);
        }else{
            console.log(data)
        }
    }

async function deleteC(id:string){
    const res = await axios.delete("/api/syllebus_make?class_type="+id );
    const data = res.data;
    if(data.success===true){
        geAllworks();
    }else{
        console.log(data)
    }
}


const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    return seNeww((prevInfo) => ({ ...prevInfo, [name]: value }));
  };



  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!neww.classType || !neww.content || !neww.contenttype) {
        console.log("please fill all the fields");
        return;
      }
      // KhaDiJa12
      console.log(neww)
      const res = await axios.post("/api/syllebus_make", neww);
        
      if (res.status == 200 || res.status == 201) {
           geAllworks()
            seNeww({
                classType: "",
                content: "",
                contenttype:"text", 
                date:""
            })
    }
  }catch(err){

  }

}

    return (
    <div>
             {works.map((t)=>{
                const time: Date = new Date(t.date);
                const current: Date =new Date();
                console.log(current.getDate())
                console.log(time.getDate())
                 return(<div className="m-3 p-2 border border-red-700" key={t._id}>
                         <b >{time.getDate()==current.getDate()?"Today":time.getDate()+"-"+time.getMonth()+"-"+time.getFullYear()}</b>
                         <div dangerouslySetInnerHTML={{ __html: t.content }}  />
                          <div><button className="p-1 bg-red-600 text-white rounded-md" onClick={()=>deleteC(t._id)}>Delete</button></div>
                      </div>)
               })}
      <div>
        <div>
        <form
              onSubmit={handleSubmit}
            >
            <select onChange={handleInputChange} name="classType" defaultValue={neww.classType}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11-12</option>
            </select>
            <select onChange={handleInputChange} name="contenttype" defaultValue={neww.classType}>
                <option value="text">text</option>
                <option value="image">image</option>
            </select>
            <input type="date" name="date" value={neww.date}  onChange={handleInputChange}/>
            <input onChange={handleInputChange} type="text" name="content" value={neww.content}/>
            <button type="submit">add+</button>
            </form>
        </div>
      </div>
    </div>
    )
}