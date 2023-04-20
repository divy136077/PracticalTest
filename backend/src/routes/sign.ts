import express from "express";
const router = express.Router();
import User from "../mongo-models/sign-schema";
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import fetchuser from "../middleware/authenticator";
require("dotenv").config();

const CreateUserValidate = [
  body("FirstName", "Name cannot be null").exists(),
  body("Email", "Email must be in valid format").isEmail(),
  body("Password", "Password must be atleast 5 characters long").isLength({
    min: 6,
  }),
];
const LoginValidate = [
  body("Email", "Email must be in valid format").isEmail(),
  body("Password", "Password cannot be null").exists(),
];

// ROUTE 1
router.post("/createuser", CreateUserValidate, async (req:any, res:any) => {
  // IF there are errors, return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check if user exists, return bad request and errors
    let user = await User.findOne({ Email: req.body.Email });
    if (user) {
      return res
        .status(400)
        .json({ error: "A User with the same email already exists." });
    }

    if(req.body.Password !== req.body.ConformPassword)
    {
      return res
        .status(400)
        .json({ error: "check password" });
    }
    var salt = await bcrypt.genSaltSync(10);
    var securedPassword = await bcrypt.hash(req.body.Password , salt);

    // Create new user instance and save it to db
    user = await User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: securedPassword,
      ConformPassword: req.body.ConformPassword
    });

    // let data = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    // res.json({ authtoken });
  } catch (error) {
    // console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2
router.post("/login", LoginValidate, async (req : any, res : any) => {
  console.log("hii");
  
  // IF there are errors, return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Email, Password } = req.body;
  try {
    let user = await User.findOne({ Email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with valid credentials." });
    }

    const validPassword = await bcrypt.compare(Password, user.Password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ error: "Please try to login with valid credentials." });
    }

    // let data = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    // res.json({ authtoken });
    return res.status(200).send("done");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// // ROUTE 3: Get a Logged-in User: POST "/api/auth/getuser". Login Required
// router.get("/getuser", fetchuser, async (req:any, res:any) => {
//   try {
//     let userid = req.user.id;
//     const user = await User.findById(userid).select("-password");
//     res.send(user);
//   } catch (error) {
//     // console.log(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;