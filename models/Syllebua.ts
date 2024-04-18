import mongoose from "mongoose";

const SyllebusSchema = new mongoose.Schema({
  classType: {
    type: String,
    required: [true, "please write your fullname"],
  },
  content: {
    type: String,
    required: [true, "please provide a valid email"],
  },
  contenttype:{
    type:String,
  },
  date:{
    type:Date,
  }
  
},{timestamps : true});

const Syllebus = mongoose.models.Syllebus || mongoose.model("Syllebus", SyllebusSchema)

export default Syllebus