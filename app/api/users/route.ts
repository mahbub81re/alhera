
/// get_all_categories
//"http://localhost:3000/api/common/categories/all_cat"

import { authOptions } from "@/libs/authOptions";
import connectDB from "@/libs/dtb";
import Users from "@/models/User";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token =await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET
    })
    const email =token?.email;
    try{
      connectDB() 
      const  res =await Users.findOne({email});
       if(res){
        return  NextResponse.json({success:true, status:200, data:res})
       }else{
        return NextResponse.json({success:false, status:401,message:"No Category founded"})
       }
    }catch(err){
        return NextResponse.json({success:false, status:402,message:"Someting is wrong!"})
    }
}
