
const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

 const productSchema = new mongoose.Schema({
    name:{type:String},
    category:{type:mongoose.Types.ObjectId,ref:"Category"},
    description:{type:String},
    color:{type:String},
    dimention:{type:String},
    material:{type:String},
    usage:{type:String},
    images:{
     type:Array
    },
    sizeChart:{
        type:Array
       },
},{timestamps:true});
productSchema.plugin(mongoosePaginate);
// memberSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });
// memberSchema.methods.toPostConcat=async function(){
//     try {
//         console.log(this._id+"generated id");

//         this.posts=this.posts.concat({posts});
//         await this.save();

//     } catch (error) {
//         console.log(error);
//     }
// }

const Member = new mongoose.model("Product", productSchema);
module.exports=Member;