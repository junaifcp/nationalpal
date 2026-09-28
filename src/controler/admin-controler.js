

const Categories=require('../../src/models/category');
const Partners=require('../../src/models/partner');
const Images=require('../../src/models/images');
const Branches=require('../../src/models/branch');
const Products=require('../../src/models/products');
const Messages=require('../../src/models/userMessages');
const mongoose=require('mongoose');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const Swal = require('sweetalert2')
const {IMAGE_ID}=require("../../public/data/images")
const { uploadImage, deleteImage, FALLBACK_IMAGE } = require('../services/s3')

const SITE_IMAGE_KEYS = [
  'homeHeader',
  'productHeader',
  'aboutHeader',
  'contactHeader',
  'homeSlider1',
  'homeSlider2',
  'logoMain',
  'logoSmall',
  'newsLetterBg',
  'homeBannerOne',
  'homeBannerTwo',
  'navDropBg',
  'aboutUsMain',
  'aboutUsWall',
  'aboutUsVideoBg',
];

exports.admin=async(req, res)=>{
  try {
    const categories=await Categories.find().sort({createdAt:-1}).lean();
    const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
  const categories2 = categories.slice(midIndex);
  const branches = await Branches.find().lean()
    const images=await Images.findOne({_id:IMAGE_ID}).lean();

    res.render('admin/login',{admin:true,categories1,categories2,images,branches})
  } catch (error) {
    console.log("error",error)
  }
    
  }

exports.login=async(req,res)=>{

  const categories=await Categories.find().sort({createdAt:-1}).lean();
  const midIndex = Math.ceil(categories.length / 2);
  const categories1 = categories.slice(0, midIndex);
const categories2 = categories.slice(midIndex);
const branches = await Branches.find().lean()
  const images=await Images.findOne({_id:IMAGE_ID}).lean();
  if(req.body.username===process.env.USER_NAME&&req.body.password===process.env.PASSWORD){
    const accessToken=jwt.sign({ username: process.env.USER_NAME, admin: true }, process.env.SECRET_KEY, { expiresIn: '1d' })
    res.cookie("adminToken",accessToken,{httpOnly:true})
    res.redirect('/admin/dashboard')
  }else{
    if(req.body.username!==process.env.USER_NAME){
      const message='Please check your username..!';
      res.render('admin/login',{adminLogin:true,message, categories1,categories2,branches,images})
    }else if(req.body.password!==process.env.PASSWORD){
      const message='Your password is not matching';
      res.render('admin/login',{adminLogin:true,message,categories1,categories2,branches,images})
    }else{
      const message='Invalid credentials...Try again';
      res.render('admin/login',{adminLogin:true,message,categories1,categories2,branches,images})
    }
   

  }
} 
exports.logout=(req,res)=>{
 res.clearCookie('adminToken');
 res.render('admin/login',{admin:true,message:"logout successfully...!!"})
}
exports.dashboard= async(req,res)=>{
 try {
   const admin=req.admin;
   if(admin){
    const products = await Products.find().populate({
      path:"category",
      select:"name"
    }).sort({createdAt:-1}).limit(10).lean()
    const messages=await Messages.find().sort({createdAt:-1}).limit(10).lean();
   
    const count={
      productCount:await Products.count({}),
      categoryCount:await Categories.count({}),
      partnerCount:await Partners.count({})
    }
    
      res.render('admin/dashboard',{admin:true,products,messages,count})
    
   
   }else{
    res.render('admin/login',{admin:true,message:"Please login to access your dashboard...!!"})
   }
 } catch (err) {
  res.render('404',{error:true,err})
 }
}

exports.products=async(req,res)=>{
  try {
    // const imageData=new Images({
    //   homeHeader:"",
    //   productHeader:"",
    //   aboutHeader:"",
    //   contactHeader:"",
    //   homeSlider:"",
    //   logoMain:"",
    //   logoSmall:""
    // })
    // await imageData.save()
    const categories=await Categories.find().sort({count:-1}).lean();
    const products = await Products.find()
    .populate({
      path:"category",
      select:"name"
    })
    .sort({createdAt:-1}).lean();
// console.log("products are",products) 
    res.render('admin/products',{admin:true,categories,products})
  } catch (error) {
    console.log("error",error)
  }
  
 }
exports.categories=async(req,res)=>{
  try {
    const categories=await Categories.find().sort({count:-1}).lean()
  console.log("categories",categories )
  let message;
if(req.query.swalCreate){
  message="Category created successfully..."
  res.render('admin/categories',{admin:true,categories,message})
}else{
  res.render('admin/categories',{admin:true,categories})
}

  
  } catch (error) {
    console.log("errror",error)
    
  }
  
 }
exports.userMessages=async(req,res)=>{
  try {
    const messages=await Messages.find().sort({createdAt:-1}).lean()

  res.render('admin/messages',{admin:true,messages})
  } catch (error) {
    console.log("errror",error)
    
  }
  
 }
exports.branches=async(req,res)=>{
  try {
    const branches=await Branches.find().sort({createdAt:-1}).lean()
  res.render('admin/branches',{admin:true,branches})
  
  } catch (error) {
    console.log("errror",error)
    
  }
  
 }
exports.deleteCategory=async(req,res)=>{
  try {
    const categoryId = req.params.id;
    const result = await Categories.findByIdAndDelete(categoryId);
    let message;
    if (result) {
      console.log('Document deleted:', result);
      res.redirect('/admin/categories')
    } else {
      console.log('Document not found');
      const categories = await Categories.find().sort({count:-1}).lean();
      message = "Unable to find particular category in database.. please try after some time";

      res.render('admin/categories',{admin:true,categories,message})
    }
  } catch (error) {
    console.error('Error deleting document:', error);
  }
  
 }
exports.deleteBranch=async(req,res)=>{
  try {
    const branchId = req.params.id;
    const result = await Branches.findByIdAndDelete(branchId);
    let message;
    if (result) {
      res.redirect('/admin/branches')
    } else {
      console.log('Document not found');
      const branches = await Branches.find().sort({createdAt:-1}).lean();
      message = "Unable to find particular category in database.. please try after some time";

      res.render('admin/branches',{admin:true,branches,message})
    }
  } catch (error) {
    console.error('Error deleting document:', error);
  }
  
 }
exports.deletePartner=async(req,res)=>{
  try {
    const partnerId = req.params.id;
    const result = await Partners.findByIdAndDelete(partnerId);
    let message;
    if (result) {
      console.log('Document deleted:', result);
      res.redirect('/admin/partners')
    } else {
      console.log('Document not found');
      const partners = await Partners.find().lean();
      message = "Unable to find particular category in database.. please try after some time";
      res.render('admin/partners',{admin:true,partners,message})
    }
  } catch (error) {
    console.error('Error deleting document:', error);
  }
  
 }
exports.deleteProduct=async(req,res)=>{
  try {
    const productId = req.params.id;
    
    const result = await Products.findByIdAndDelete(productId);
    if (result) {
      const imageFilenames = [...(result.images || []), ...(result.sizeChart || [])];
      for (const filename of imageFilenames) {
        await deleteImage(filename);
      }
      await Categories.findOneAndUpdate({_id:result.category},{
        $inc:{count:-1}
      });
      console.log('Document deleted:', result);
      res.redirect('/admin/products')
    } else {
      console.log('Document not found');
      const categories = await Categories.find().sort({count:-1}).lean();
      const products = await Products.find()
      .populate({
        path:"category",
        select:"name"
      })
      .sort({createdAt:-1}).lean();
      const message = "Unable to find particular product in database.. please try after some time";

      res.render('admin/products',{admin:true,categories,message,products})
    }
  } catch (error) {
    console.error('Error deleting document:', error);
  }
  
 }

exports.partners=async(req,res)=>{
  try {
    const partners=await Partners.find().lean()
    res.render('admin/partners',{admin:true,partners})
  } catch (error) {
    console.log("error",error)
  }
 
 }
exports.imageHandle=async(req,res)=>{
  try {
    const images=await Images.findById(IMAGE_ID).lean();
    console.log(">>>>>>>IMG",images)
    res.render('admin/imageHandle',{admin:true,images})
  } catch (error) {
    console.log("error");
    res.redirect('/admin/dashboard');
  }
  
 }
exports.addNewCategory=async(req,res,next)=>{
  try {
   console.log("reqqqqBoddyd",req.body)
   const files=req.files;
   console.log("files are",files && files[0])
   const {name,description}=req.body;
   let imageName = files && files[0] ? await uploadImage(files[0]) : FALLBACK_IMAGE
  const category = new Categories({
    name,
    description,
    image:imageName,
  });
  console.log("new category is",category)
  await category.save()
  res.redirect('/admin/categories?swalCreate=addNewCategory')
  // const categories =await Categories.find({}).sort({count:-1}).lean();
  // res.render('admin/categories',{admin:true,message,categories})
  } catch (error) {
    console.log("errror",error)
    res.redirect('/admin/categories')
  }

 }
exports.addNewBranch=async(req,res,next)=>{
  try {
   console.log("reqqqqBoddyd",req.body)
  const branch = new Branches(req.body);
  await branch.save()
  res.redirect('/admin/branches')
  // const categories =await Categories.find({}).sort({count:-1}).lean();
  // res.render('admin/categories',{admin:true,message,categories})
  } catch (error) {
    console.log("errror",error)
    res.redirect('/admin/branches')
  }

 }
exports.addNewPartner=async(req,res,next)=>{
  try {
   console.log("reqqqqBoddyd",req.body)
   const files=req.files;
   console.log("files are",files && files[0])
   const {name,description}=req.body;
   let imageName = files && files[0] ? await uploadImage(files[0]) : FALLBACK_IMAGE
  const partner = new Partners({
    name,
    description,
    image:imageName,
  });
  await partner.save()
  res.redirect('/admin/partners')
  // const categories =await Categories.find({}).sort({count:-1}).lean();
  // res.render('admin/categories',{admin:true,message,categories})
  } catch (error) {
    console.log("errror",error)
    res.redirect('/admin/partners')
  }

 }
exports.uploadImage=async(req,res,next)=>{
  try {
   const files=req.files || [];
   const imageKey=req.params.id;
   if (!SITE_IMAGE_KEYS.includes(imageKey) || !files[0]) {
     return res.redirect('/admin/images');
   }
   const current = await Images.findById(IMAGE_ID).lean();
   if (current && current[imageKey]) {
     await deleteImage(current[imageKey]);
   }
   const imageName = await uploadImage(files[0]);
   const updateObject = {};
    updateObject[imageKey] = imageName;
   await Images.findOneAndUpdate({_id:IMAGE_ID},{
    $set:updateObject
   })
   res.redirect("/admin/images")
  } catch (error) {
    console.log("errror",error)
    res.redirect('/admin/images')
  }

 }
exports.deleteSiteImage=async(req,res)=>{
  try {
    const imageKey = req.params.id;
    if (!SITE_IMAGE_KEYS.includes(imageKey)) {
      return res.redirect('/admin/images');
    }
    const current = await Images.findById(IMAGE_ID).lean();
    if (current && current[imageKey]) {
      await deleteImage(current[imageKey]);
      const unset = {};
      unset[imageKey] = '';
      await Images.findByIdAndUpdate(IMAGE_ID, { $unset: unset });
    }
    res.redirect('/admin/images');
  } catch (error) {
    console.log("errror",error)
    res.redirect('/admin/images');
  }
}
exports.addNewProduct=async(req,res,next)=>{
  try {
   console.log("reqqqqBoddyd",req.body)
   const files=req.files;
  //  console.log("files are",files)
   const {name,category,description,color,dimention,material,usage} = req.body;
   let images=[];
   let sizeChart=[];
   if(files && (files['image'] || files['images'])){
    if(files['image']){
      for (const element of files['image'].slice(0, 1)) {
        sizeChart.push(await uploadImage(element))
      }
    }
    if(files['images']){
      for (const element of files['images'].slice(0, 3)) {
        images.push(await uploadImage(element))
      }
    }
   }else{
    images.push(FALLBACK_IMAGE)
   }

   const product = new Products({
    name,
    description,
    category,
    color:req.body.color?color:"N/A",
    dimention:req.body.dimention?dimention:"N/A",
    material:req.body.material?material:"N/A",
    usage,
    images,
    sizeChart
  });
   await product.save();
   await Categories.findOneAndUpdate({_id:category},{
    $inc:{count:1}
});
  res.redirect('/admin/products')
  // const categories =await Categories.find({}).sort({count:-1}).lean();
  // res.render('admin/categories',{admin:true,message,categories})
  } catch (error) {
    console.log("errror",error)
  }

 }
exports.updateProduct=async(req,res,next)=>{
  try {
   const productId = req.params.id;
   const product = await Products.findOne({_id:productId})
   if(!product){

   }
   const {name,category,description,color,dimention,material,usage} = req.body;
   const files=req.files;
   console.log("files areee>>>",files)
   let sizeChart=[];
   let images=[];
   if(files && files.image){
    for (const element of files.image.slice(0, 1)) {
      sizeChart.push(await uploadImage(element))
    }
   }
   if(files && files.images){
    for (const element of files.images.slice(0, 3)) {
      images.push(await uploadImage(element))
    }
   }
if(name){
  product.name=name;
};
if(category && product.category != category){
  await Categories.findOneAndUpdate({_id:product.category},{
    $inc:{count:-1}
});
await Categories.findOneAndUpdate({_id:category},{
  $inc:{count:1}
});
  product.category=category
}
if(description){
  product.description=description
}
if(color){
  product.color=color
}
if(material){
  product.material=material
}
if(dimention){
  product.dimention=dimention
}
if(usage){
  product.usage=usage
}
if(files && files.image && sizeChart.length){
  product.sizeChart = sizeChart;
}
if(files && files.images && images.length){
  product.images = images;
}
await product.save();
  res.redirect('/admin/products')
  // const categories =await Categories.find({}).sort({count:-1}).lean();
  // res.render('admin/categories',{admin:true,message,categories})
  } catch (error) {
    console.log("errror",error)
  }

 }
