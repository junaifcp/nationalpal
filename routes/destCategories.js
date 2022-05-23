const router=require('express').Router();
const DestCategory=require('../src/models/destCategory');
const store=require('../src/middleware/multer')
const {category}=require('../src/middleware/validator')
const {validationResult}=require('express-validator')
const destCat=require('../src/models/destCategory')
router.post('/',[store.array('photo')],[category],async(req,res)=>{
    const categories=await destCat.find().lean()
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        const alert=errors.array()
        res.render('admin/destination-add',{admin:true,categories,alert})
      }
    const newCat=new DestCategory({
        name:req.body.name,
        desc:req.body.desc,
        photo:req.files[0].filename
    });
    try {
        const savedCat=await newCat.save()
        res.render('admin/destination-add',{admin:true,categories,message:"Category added successfully...!"})
        // res.redirect('/admin/destination')
    } catch (error) {
        res.status(500).json(error)
    }

})
router.get('/',async(req,res)=>{
    try {
        const cats=await Category.find()
        res.status(200).json(cats)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports=router