const router=require('express').Router();
const Destination=require('../src/models/destination');
const Category=require('../src/models/destCategory');
const store=require('../src/middleware/multer');
const {title,validateDesc}=require('../src/middleware/validator')
const {validationResult}=require('express-validator')
const auth=require('../src/middleware/memberAuth')
router.post('/',[store.array('images',6),auth],[title,validateDesc],async(req,res)=>{
    const errors=validationResult(req)
    const categories=await Category.find().lean()
    if(!errors.isEmpty()){
        const alert1=errors.array()
        
        res.render('admin/destination-add',{admin:true,categories,alert1})
        
      }
    const files=req.files;
    console.log(files);
    const category=req.body.categories;
    if(!files){
        const error=new Error('Please choose files')
        error.httpStatusCode=400;
        return next(error)
    }
    const newCat=await Category.findOne({name:category});
    if(newCat){
        const updateCatCount=await Category.findOneAndUpdate({name:category},{
            $inc:{count:1}
        });
    }
    if(!newCat){
        const addCat=new Category({
            name:category,
            count:1
        });
        const saveCat=await addCat.save()
    }
    let result = files.map((src,index)=>{
           return filename=files[index].filename
    })
    const addDestination=new Destination({
           title:req.body.title,
           desc:req.body.desc,
           markdown:req.body.markdown,
           photo:result,
           username:req.body.username,
           categories:req.body.categories 
    })
    req.session.addDestination=true;
    const savedDestination=await addDestination.save()
    res.render('admin/destination-add',{admin:true,categories,message1:"Destination added successfully"})
})
router.get('/',async(req,res)=>{
   
})
module.exports=router