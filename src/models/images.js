const mongoose=require('mongoose');

const ImageSchema=new mongoose.Schema({
    homeHeader:{type:String},
    productHeader:{type:String},
    aboutHeader:{type:String},
    contactHeader:{type:String},
    homeSlider1:{type:String},
    homeSlider2:{type:String},
    logoMain:{type:String},
    logoSmall:{type:String},
    categoryCommon:{type:String},
    aboutUsSlider:{type:String},
    newsLetterBg:{type:String},
    aboutUsQuoteBg:{type:String},
    newLetterBg:{type:String},
    homeBannerOne:{type:String},
    homeBannerTwo:{type:String},
    navDropBg:{type:String},
    aboutUsWall:{type:String},
    aboutUsMain:{type:String},
    aboutUsVideoBg:{type:String},
}
);

module.exports=mongoose.model("Image",ImageSchema);
