const mongoose=require('mongoose');

const BranchSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    location:{
        type:String
    },
    email:{
        type:String,
    },
    mobile:{
        type:String
    }
    },
    {timestamps:true}
    );

module.exports=mongoose.model("Branch",BranchSchema);
