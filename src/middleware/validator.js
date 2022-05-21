const {check} = require('express-validator')
module.exports = {
    validateUsername : check('name')
    
      // To delete leading and trailing space
      .trim()
    
      // Validate minimum length of password
      // Optional for this context
      .isLength({min:4,max:20})
    
      // Custom message
      .withMessage('Username must be minimum 4 characters long')
    
      // Validate username to be alphanumeric
    //   .isAlphanumeric()
    
    //   // Custom message
    //   .withMessage('Username must be alphanumeric')
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
      
     
    
  }