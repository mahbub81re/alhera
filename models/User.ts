import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please write your fullname"],
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
  },
  class_type:{
    type:String,
  },
  payment_due:{
     type:Number,
     default:0,
  },
  payment_paid:{
    type:Number,
    default:0,
  },
  presents:{
    type:Array,
  },
  phone:{
    type: String,
  },
  password: {
    type: String,
  },
  gender:{
    type:String,
    default:"female",
  }
});

const Users = mongoose.models.User || mongoose.model("User", userSchema)

export default Users