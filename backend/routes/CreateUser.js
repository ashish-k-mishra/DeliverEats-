const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name", "Incorrect Name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //Start  - For Express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //End
    
    //Start - For Password Hashing 
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    //End

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,  // Password here is stored by hashing (secPassword) using bcrypt.
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
