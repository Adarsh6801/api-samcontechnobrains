import mongoose from "mongoose";

//user schema
const EmailSheduleSchema=new mongoose.Schema({
    Email:{
        type:String,
        require:true
    },
    Subject:{
        type:String,
        require:true
    },
    Shedule:{
        type:String,
    },
},{ timestamps: true });

export default mongoose.model('EmailShedule', EmailSheduleSchema);