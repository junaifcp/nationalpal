const mongoose=require('mongoose');

const ImageSchema=new mongoose.Schema({
    homeHeader:{type:String},
    productHeader:{type:String},
    aboutHeader:{type:String},
    contactHeader:{type:String},
    homeSlider:{type:String},
    logoMain:{type:String},
    logoSmall:{type:String},
    categoryCommon:{type:String},
    aboutUsSlider:{type:String},
    newsLetterBg:{type:String},
    aboutUsQuoteBg:{type:String}
}
);

module.exports=mongoose.model("Image",ImageSchema);
