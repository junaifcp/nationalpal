// require('../src/db/conn');

const bcrypt=require('bcryptjs');
// const auth = require('../src/middleware/userAuth');
const otpGenerator=require('otp-generator');
const _ =require('lodash');
const mongoose=require('mongoose');
const { ObjectId } = require('mongodb');
const axios = require("axios");
const Category = require('../models/category');
const Messages = require('../models/userMessages');
const jwt = require('jsonwebtoken')
const path = require('path');
const nodemailer=require('nodemailer')
const Products=require("../models/products");
const Images=require("../models/images");
const Categories=require("../models/category");
const Branches=require("../models/branch");
const Partners=require("../models/partner");
const { IMAGE_ID } = require('../../public/data/images');

//Home route starts here
exports.home=async (req,res)=>{
  try {
    const latestProducts=await Products.find().sort({createdAt:-1}).limit(8).lean()
    const categories=await Categories.find().sort({createdAt:-1}).lean();
const branches = await Branches.find().lean()
    const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
  const categories2 = categories.slice(midIndex);

    const images=await Images.findOne({_id:IMAGE_ID}).lean();
    const partners=await Partners.find().lean();
    const numberOfRandomDocuments = 8;

    Products.aggregate([
  { $sample: { size: numberOfRandomDocuments } }
]).exec((error, products) => {
  if (error) {
    console.error('Error fetching random documents:', error);
    
  } else {
    console.log('Random documents:', products);
   
    res.render('index',{client:true,products,categories,branches,images,partners,latestProducts,categories1,categories2});
  }
});
  } catch (error) {
    console.log("error");
    
  }
   
   
}




  exports.about=async(req,res)=>{
    try {
      const categories=await Categories.find().sort({createdAt:-1}).lean();
      const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
  const categories2 = categories.slice(midIndex);
  const branches = await Branches.find().lean()
    const images=await Images.findOne({_id:IMAGE_ID}).lean();
    const partners=await Partners.find().lean();

  res.render('landing/about',{categories1,categories2,branches,images,partners})
    } catch (error) {
      res.render('404',{error:true,err})
    }
     
   
  }

  exports.products=async(req,res,next)=>{
    try {
      
      const latestProducts=await Products.find().populate({
        path:"category",
        select:"name"
      })
      .sort({createdAt:-1}).limit(8).lean()
    const categories=await Categories.find().sort({createdAt:-1}).lean();
    const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
    const categories2 = categories.slice(midIndex);
    const branches = await Branches.find().lean()
    const images=await Images.findOne({_id:IMAGE_ID}).lean();
    const partners=await Partners.find().lean();
    const productsPerPage = 2;
    const currentPage = parseInt(req.query.page) || 1; // Get current page from query parameter
    const startIndex = (currentPage - 1) * productsPerPage;
    const products = await Products.find()
    .populate({
      path:"category",
      select:"name"
    })
    .sort({createdAt:-1}).lean();
    // let products=[...productsAll]
    const totalProducts = products.length;
    const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(">>>>>>pages",pages)


      res.render('landing/products',{visibleProducts,
        totalProducts,
        currentPage:currentPage,
        productsPerPage,
         partners,
        branches,
        images,
        categories,
        latestProducts,
        pages,
        hasPrev:currentPage>1,
        hasNext:currentPage<totalPages,
        prevPage:currentPage-1,
        nextPage:currentPage+1,
        categories1,
        categories2
        
      })
    } catch (error) {
      console.log("errror is",error)
      res.redirect('/')
    }
      
  }

  exports.messages=async(req,res,next)=>{
try {
  const messaages=new Messages(req.body);
  await messaages.save();
  res.redirect("/contactUs?status=true")
} catch (error) {
  res.redirect("/contactUs")
}
  }
  exports.downloadBrochure=async(req,res,next)=>{
try {
  const publicFolderPath = path.join(__dirname, '..', '..', 'public');

  const brochurePath = publicFolderPath + '/NationalPals-product-Brochure_2022.pdf';
  console.log("PublicPath",publicFolderPath)
  console.log("brochurePath",brochurePath)
  res.download(brochurePath, 'NationalPals-product-Brochure_2022.pdf'); 

} catch (error) {
  res.redirect("/contactUs")
}
  }
  exports.singleCategory=async(req,res,next)=>{
    try {
      const categoryId= mongoose.Types.ObjectId(req.params.id);
      const latestProducts=await Products.find().populate({
        path:"category",
        select:"name"
      })
      .sort({createdAt:-1}).limit(8).lean()
    const categories=await Categories.find().sort({createdAt:-1}).lean();
    const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
  const categories2 = categories.slice(midIndex);
const branches = await Branches.find().lean()
    const images=await Images.findOne({_id:IMAGE_ID}).lean();
    const partners=await Partners.find().lean();
    const productsPerPage = 2;
    const currentPage = parseInt(req.query.page) || 1; // Get current page from query parameter
  const startIndex = (currentPage - 1) * productsPerPage;
    const products = await Products.find({category:categoryId})
    .populate({
      path:"category",
      select:"name"
    })
    .sort({createdAt:-1}).lean();
    // let products=[...productsAll]
    const totalProducts = products.length;
    const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(">>>>>>pages",pages)


      res.render('landing/products',{visibleProducts,
        totalProducts,
        currentPage:currentPage,
        productsPerPage,
         partners,
        branches,   
        images,
        categories,
        categories1,
        categories2,
        latestProducts,
        pages,
        hasPrev:currentPage>1,
        hasNext:currentPage<totalPages,
        prevPage:currentPage-1,
        nextPage:currentPage+1
        
      })
    } catch (error) {
      console.log("errror is",error)
      res.redirect('/')
    }
      
  }
  exports.singleProducts=async(req,res)=>{
    try {
      // const _id=mongoose.Types.ObjectId(req.params.id);
      const _id= req.params.id;
      const categories=await Categories.find().sort({createdAt:-1}).lean();
      const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
  const categories2 = categories.slice(midIndex);
      const branches = await Branches.find().lean()
      const images=await Images.findOne({_id:IMAGE_ID}).lean();
      const partners=await Partners.find().lean();
      const idArray = ["v-pills-home1","v-pills-profile1","v-pills-messages1"];
      const labelledbyArray = ["v-pills-home-tab1","v-pills-profile-tab1","v-pills-messages-tab1"];
      const products = await Products.findOne({_id})
    .populate({
      path:"category",
      select:"name"
    }).lean();

    res.render('landing/singleProduct',{ categories,
      branches,
      images,
      categories1,
      categories2,
      partners,
      products,
      idArray,
      labelledbyArray
    })
    } catch (err) {
      res.render('404',{error:true,err})
    }
  }
  exports.partners=async(req,res)=>{
    const categories=await Categories.find().sort({createdAt:-1}).lean();
    const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
  const categories2 = categories.slice(midIndex);
  const branches = await Branches.find().lean()
      const images=await Images.findOne({_id:IMAGE_ID}).lean();
      const partners=await Partners.find().lean();

      res.render('landing/partners',{branches,categories1,categories2,images,partners})
  }
  exports.contactUs=async(req,res)=>{

    try {
      const {status}=req.query;
      let message;
      if(status){
        message="your form has been submitted successfully.."
      }
      const categories=await Categories.find().sort({createdAt:-1}).lean();
    const midIndex = Math.ceil(categories.length / 2);
    const categories1 = categories.slice(0, midIndex);
  const categories2 = categories.slice(midIndex);
  const branches = await Branches.find().lean()
  const images=await Images.findOne({_id:IMAGE_ID}).lean();
      res.render('landing/contact-us',{categories1,categories2,branches,images,message})
    } catch (error) {
      res.redirect('/')
    }
    
  }



