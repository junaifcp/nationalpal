const mongoose=require('mongoose');
// var md = require('markdown-it')();
const marked=require('marked');
const slugify=require('slugify');
const createDOMPurify=require('dompurify');
 
const {JSDOM}=require('jsdom');
const DOMPurify=createDOMPurify(new JSDOM().window);
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    userId:{
        type:String
    },
    markdown:{
        type:String,
        required:true
    },
    sanitizedHtml:{
        type:String,
       
    },
    photo:{
        type:String,
       required:false
    },
    username:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
         required:false,
    }},
    {timestamps:true}
    );
    

module.exports=mongoose.model("Post",PostSchema);