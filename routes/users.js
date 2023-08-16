var express = require('express');
var router = express.Router();
require('../src/db/conn');
const auth = require('../src/middleware/userAuth');
const app = require('../app');
const controler=require('../src/controler/user-controler');
const store=require('../src/middleware/multer');
const parseUrl=express.urlencoded({extended:false})
const parseJson=express.json({extended:false})
const validator = require('../src/middleware/validator')
const {check,validationResult}=require('express-validator')
// loading posts for pagination
/* GET home page. */


//landing pages route
router.get('/',controler.home);
router.get('/about',controler.about);
router.get('/products',controler.products)
router.get('/partners',controler.partners)
router.get('/contactUs',controler.contactUs)
router.get('/products/:id',controler.singleProducts);
router.get('/categories/:id',controler.singleCategory);
router.get('/categories',controler.products);
router.post('/message',controler.messages);
router.get('/downloadBrochure',controler.downloadBrochure);
// router.get('/')

module.exports = router;
