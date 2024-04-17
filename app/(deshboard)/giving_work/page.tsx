"use client"
import axios from "axios";
import { useEffect, useState } from "react"

type Work ={
    _id: string,
    classType: string,
    content: string,
    contenttype:string,
  }

export default function GivingWork(){
    const [works,setWorks]= useState <Work[] | []>([]);
    useEffect(()=>{
        geAllworks()
    },[]);

    const [neww , seNeww] = useState({
        classType: "",
        content: "",
        contenttype:"",
    });

    async function geAllworks() {
        const res=await axios.get("/api/given_work");
        const data = res.data;
        if(data.success===true){
            setWorks(data.data);
        }else{
            console.log(data)
        }
    }

async function deleteC(id:string){
    const res = await axios.delete("/api/daily-work?class_type="+id);
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
      console.log("fetching...")
      const res = await axios.post("/api/daily-work", neww);
        
      if (res.status == 200 || res.status == 201) {
           geAllworks()
            seNeww({
                classType: "",
                content: "",
                contenttype:"",   
            })
    }
  }catch(err){

  }

}

    return (
    <div>
             {works.map((t)=>{
                 return(<div key={t._id}>
                         <div dangerouslySetInnerHTML={{ __html: t.content }} />
                          <div><button onClick={()=>deleteC(t.classType)}>Delete</button></div>
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
            <input onChange={handleInputChange} type="text" name="content" value={neww.content}/>
            <button type="submit">add+</button>
            </form>
        </div>
      </div>
    </div>
    )
}