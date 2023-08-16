var express = require('express');
var router = express.Router();
const controler=require('../src/controler/admin-controler')
const auth = require('../src/middleware/memberAuth');
const store=require('../src/middleware/multer');
const multer = require('multer');

// const upload = multer({ dest: 'uploads/' }); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Define the destination directory based on the field name
      if (file.fieldname === 'image') {
        cb(null, 'public/uploads');
      } else if (file.fieldname === 'images') {
        cb(null, 'public/uploads');
      } else {
        cb(new Error('Invalid field name'));
      }
    },
    filename: (req, file, cb) => {
      // Define the filename for the uploaded file
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      var ext=file.originalname.substring(file.originalname.lastIndexOf("."))
      cb(null, file.fieldname + '-' +Date.now()+ext);
    },
  });
  
  // Initialize Multer
  const upload = multer({ storage });
  

router.get('/',controler.admin);
router.post('/login',controler.login);
router.get('/logout',controler.logout);
router.get('/dashboard',auth,controler.dashboard);
router.get('/products',controler.products)
router.get('/categories',controler.categories)
router.get('/branches',controler.branches)
router.get('/deleteCategory/:id',controler.deleteCategory)
router.get('/deletePartner/:id',controler.deletePartner)
router.get('/deleteBranch/:id',controler.deleteBranch)
router.get('/partners',controler.partners)
router.get('/images',controler.imageHandle)
router.post('/addNewCategory',store.array('images',1),controler.addNewCategory);
router.post('/addNewPartner',store.array('images',1),controler.addNewPartner);
router.post('/addNewBranch',controler.addNewBranch);
// router.post('/addNewProduct',store.array('images',12),controler.addNewProduct);
router.post('/addNewProduct',upload.fields([{ name: 'image' }, { name: 'images' }]),controler.addNewProduct);
router.post('/updateProduct/:id',upload.fields([{ name: 'image' }, { name: 'images' }]),controler.updateProduct);
router.get('/deleteProduct/:id',store.array('images',12),controler.deleteProduct);
router.post('/uploadImage/:id',store.array('images',12),controler.uploadImage);
router.get('/messages',controler.userMessages);

router.get('/dashboard/delete-user/:id',controler.deleteUser);
router.get('/dashboard/delete-guide/:id',controler.deleteGuide);
router.get('/dashboard/delete-post/:id',controler.deletePost);
router.get('/dashboard/block-user/:id',controler.blockUser);
router.get('/dashboard/block-guide/:id',controler.blockGuide);
router.get('/tourists-all',auth,controler.touristsAll);
router.get('/guides-all',auth,controler.guidesAll);
router.get('/posts-all',auth,controler.postsAll);
router.get('/payments-all',auth,controler.paymentsAll);
router.get('/destination',auth,controler.destination);
// router.get('/dashboard/unblock-user/:id',controler.blockUser);
module.exports = router;