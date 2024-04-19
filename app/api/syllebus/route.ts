import connectDB from "@/libs/dtb";
import DailyWork from "@/models/DailyWork";
import Syllebus from "@/models/Syllebua";
import { NextResponse } from "next/server";

    export async function GET(){
        
        try {
            connectDB()
            const  res =await  Syllebus.find({}).sort('-createdAt');
            if(res){
                return NextResponse.json({success:true,status:200,data:res});
            }else{
                return NextResponse.json({success:false,status:401,data:"Not found"});
            }
        } catch (error) {
            return NextResponse.json({success:false,status:500,data:error});
            
        }
    }