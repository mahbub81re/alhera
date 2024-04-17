
/// get_all_categories
//"http://localhost:3000/api/common/categories/all_cat"

import connectDB from "@/libs/dtb";
import DailyWork from "@/models/DailyWork";
import Users from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('class_type');
    
    try{
      connectDB() 
      const  res =await DailyWork.find({classType:id});
       if(res){
        console.log(res)
        return  NextResponse.json({success:true, status:200, data:res})
       }else{
        return NextResponse.json({success:false, status:401,message:"No Category founded"})
       }
    }catch(err){
        NextResponse.json({success:false, status:402,message:"Someting is wrong!"})
    }
}

export async function POST(req:NextRequest){
    const data =await req.json();
  console.log(data)
    try{
            connectDB();

            const res =  await DailyWork.create(data);
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,message:"Did not Found Order"})
            }
       
    }catch(err){
        return NextResponse.json({success:false,status:402,message:err})
    }
}

export async function DELETE(req:NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('class_type');
    

    try{
            connectDB();

            const  res =await DailyWork.deleteMany({classType:id});
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,message:"Did not Found Order"})
            }
       
    }catch(err){
        return NextResponse.json({success:false,status:402,message:err})
    }
}