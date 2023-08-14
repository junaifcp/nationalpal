const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    count:{
        type:Number,
        default:0
    },
    image:{
        type:String
    }
    },
    {timestamps:true}
    );

module.exports=mongoose.model("Category",CategorySchema);
