
/// get_all_categories
//"http://localhost:3000/api/common/categories/all_cat"

import connectDB from "@/libs/dtb";
import Users from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
      connectDB() 
      const  res =await Users.find({});
       if(res){
        return  NextResponse.json({success:true, status:200, data:res})
       }else{
        return NextResponse.json({success:false, status:401,message:"No Category founded"})
       }
    }catch(err){
        return NextResponse.json({success:false, status:402,message:"Someting is wrong!"})
    }
}
