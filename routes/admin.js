var express = require('express');
var router = express.Router();
const controler=require('../src/controler/admin-controler')
const auth = require('../src/middleware/memberAuth');
const store=require('../src/middleware/multer');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
  

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
router.post('/uploadImage/:id',store.array('images',1),controler.uploadImage);
router.get('/deleteImage/:id',controler.deleteSiteImage);
router.get('/messages',controler.userMessages);

// router.get('/dashboard/unblock-user/:id',controler.blockUser);
module.exports = router;