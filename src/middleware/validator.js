const {check} = require('express-validator')
const { isLength } = require('lodash')
module.exports ={
    validateUsername:check('name')
      .trim()
      .isLength({min:4,max:20})
      .withMessage('Username must be minimum 4 characters long')
      .isAlpha('en-US', {ignore: ' '})
      .withMessage('Name must be alphabetic.'),

      validateEmail:check('email')
      .trim()
      .isEmail()
      .normalizeEmail() 
      .withMessage('Your entered Email is not valid'),

      validateSubject:check('subject')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Subject can not be Empty'),

      validateDetails:check('details')
      .isLength({min:10,max:200})
      .withMessage('Message cant be empty.Must be 2-20 charecters'),

      validatePassword:check('password')
      .exists()
      .isLength({min:3})
      .withMessage('password must be atleast 3 letters'),

      firstName:check('firstName')
      .trim()
      .isLength({min:4,max:20})
      .withMessage('Name must be minimum 4 characters long')
      .isAlpha()
      .withMessage('Name must be alphabetic.'),

      lastName:check('lastName')
      .trim()
      .isLength({min:1,max:20})
      .withMessage('Las name must be 1-20 characters long')
      .isAlpha()
      .withMessage('Name must be alphabetic.'),

      userName:check('userName')
      .trim()
      .isLength({min:3,max:20})
      .withMessage('Name must be minimum 4-20 characters long')
      .isAlphanumeric()
      .withMessage('User name must be alpha numeric. Special charecter are not allowed'),
      
      guidePhone:check('guidePhone')
      .trim()
      .isInt()
      .withMessage('Number must be an intiger number')
      .isLength({min:10,max:15})
      .withMessage('Number must be 2-10 letters'),
      guideAge:check('guideAge')
      .trim()
      .isAlpha()
      .withMessage('Age must be Alphabetics')
      .isLength({min:1,max:3})
      .withMessage('It is not a valid Age'),
      title:check('title')
      .trim()
      .isLength({min:3,max:100})
      .withMessage('Title can not be empty or too long'),
      validateDesc:check('desc')
      .isLength({min:10,max:500})
      .withMessage('Description can not be empty. Minimum 100 charecters needed'),
      touristPhone:check('touristPhone')
      .trim()
      .isInt()
      .withMessage('Number must be an intiger number')
      .isLength({min:10,max:15})
      .withMessage('Number must be 2-10 letters'),
      touristAge:check('touristAge')
      .trim()
      .isInt()
      .withMessage('Number must be an intiger number')
      .isLength({min:1,max:3})
      .withMessage('It is not a valid Age'),
      category:check('name')
      .trim()
      .isLength({min:4,max:20})
      .withMessage('Category must be minimum 3 characters long')
      .isAlpha()
      .withMessage('Category must be alphabetic.'),
      bankName:check('bank')
      .trim()
      .isLength({min:3,max:30})
      .withMessage('Bank name must be minimum 4 characters long')
      .isAlpha()
      .withMessage('Bank name must be alphabetic.'),
      accountNumber:check('accNumber')
      .trim()
      .isInt()
      .withMessage('Account number must be an intiger number')
      .isLength({min:10,max:20})
      .withMessage('Account number must be 2-10 letters long'),
      ifsc:check('ifsc')
      .trim()
      .isLength({min:3,max:20})
      .withMessage('Invalid IFSC code')
      .isAlphanumeric()
      .withMessage('Special charecters are not allowed in IFSC code'),

}
  