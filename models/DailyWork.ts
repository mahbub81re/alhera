import mongoose from "mongoose";

const DailyWorkSchema = new mongoose.Schema({
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
  
},{timestamps : true});

const DailyWork = mongoose.models.DailyWork || mongoose.model("DailyWork", DailyWorkSchema)

export default DailyWork