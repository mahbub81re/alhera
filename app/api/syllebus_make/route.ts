
/// get_all_categories
//"http://localhost:3000/api/common/categories/all_cat"

import connectDB from "@/libs/dtb";
import Syllebus from "@/models/Syllebua";
import Users from "@/models/User";
import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    try{
      connectDB() 
      const user = await Users.findOne({email:token?.email})
      const  res =await Syllebus.find({classType:user.class_type}).sort('-date');
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
    const {  classType,
    content,
    contenttype, 
    date } =await req.json();
    try{
            connectDB();

            const res =  await Syllebus.create({classType,
                content,
                contenttype, 
                date:  new Date(date + "T00:00:00")});

            if(res){
                console.log(res)
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

            const  res =await Syllebus.findByIdAndDelete(id);
            if(res){
                return NextResponse.json({success:true,status:200,data:res})
            }else{
                return NextResponse.json({success:false,status:402,message:"Did not Found Order"})
            }
       
    }catch(err){
        return NextResponse.json({success:false,status:402,message:err})
    }
}