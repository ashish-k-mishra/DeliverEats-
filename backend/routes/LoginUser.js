const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MyNameIsAshishAndIAmMERNStackDeveloper@#$"

router.post("/loginuser", 
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
    async (req, res) => {
        
        //Start  - Express Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //End
        
    let email = req.body.email.trim();  // Trim the email to remove extra spaces
    try {
      let userData = await User.findOne({email});  // findOne() method is used to check, email is existing in User model or not.
      if (!userData) {
        console.log("userData not found!");
        return res.status(400).json({ errors: "Try logging with correct credentials." });
    }
    
    //Start  -  For comparing password by bcrypt.js
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password)  //bcrypt.compare() method compare original password with encrypted hash password
    if(!pwdCompare){
        console.log("pwdCompare failed!");
        return res.status(400).json({ errors: "Try logging with correct credentials." });
      }
      //End

      //Start  -  Password comparison successful, generate and send the JWT token
      const data = {user: {id: userData.id}}
      const authToken = jwt.sign(data, jwtSecret)     //For assigning token to the user
      return res.json({ success: true, authToken:authToken})
      //End

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
