const mongoose=require('mongoose');

const MessageSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{type:String},
    message:{type:String},
    subject:{type:String}
    },
    {timestamps:true}
    );

module.exports=mongoose.model("UserMessage",MessageSchema);
