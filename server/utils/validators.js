const { body } = require('express-validator');
module.exports = {
  registerValidator: [
    body('name')
        .trim()
        .isLength(2)
        .withMessage('Name field, min 2 character required'),
    body('email')
        .trim()
        .exists()
        .isEmail()
        .withMessage('Email must be a valid email')
        .normalizeEmail()
        .toLowerCase(),
    body('mobile') 
        .trim()
        .isMobilePhone()
        .withMessage('Mobile must be a valid Number')   
  ],
};