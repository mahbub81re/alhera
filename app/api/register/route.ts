
import connectDB from "@/libs/dtb";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import bycrptjs from "bcryptjs"
connectDB();

export async function POST(request: NextRequest) {
    console.log("herw")
  try {
    const { name, email, password } = await request.json();
     console.log(name,email)
    const user = await User.findOne({ email });
    const salt = await bycrptjs.genSalt(10);
    const hashedPassword = await bycrptjs.hash(password, salt);

    if (user && user.password) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }else if(user){
      
    User.findOneAndUpdate({
        email:email
      },
       {password:hashedPassword}
      ).then((data)=>{
        return NextResponse.json({
          message: "User created successfully",
          success: true,
          data,
        });
      });
    }

    

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

   await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user:{email:email, password:password},
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


//23442343