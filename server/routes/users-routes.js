// const express = require("express");
// const { check } = require("express-validator");

// const router = express.Router();

// const usersControllers = require("../controllers/users-controllers");
// const { User } = require('../models/user');
// //get all users
// router.get("/", usersControllers.getAllUsers);

// //get user by id
// router.get("/:uid", usersControllers.getUserById);

// //sign up new user
// router.post(
//   "/signup",
//   [
//     check("name").matches(/^[A-Za-z][A-Za-z\s.-]*$/),
//     // check("address").matches(/^[A-Za-z\d]/),
//     check("email").normalizeEmail().isEmail(),
//     // check("phone").isNumeric().isLength({ min: 10, max: 10 }),
//     check("password").matches(
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@#!$%^&*._-]{3,}$/,
//       "i"
//     ),
//   ],
//   usersControllers.signupUser
// );
// router.post('/api/users/register',(req,res)=>{
//   const user = new User(req.body);
//   console.log("registering");
//   user.save((err,doc)=>{
//       if(err) return res.json({success:false,err});
//       res.status(200).json({
//           success: true
//       })
//   })
// },

// );


// //login user
// router.post("/login", usersControllers.loginUser);

// //update user
// router.patch(
//   "/update/:uid",
//   [
//     check("address").matches(/^[A-Za-z\d]/),
//     check("phone").isNumeric().isLength({ min: 10, max: 10 }),
//     check("password").matches(
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@#!$%^&*._-]{8,}$/,
//       "i"
//     ),
//   ],
//   usersControllers.updateUser
// );

// //delete user
// router.delete("/:uid", usersControllers.deleteUser);

// module.exports = router;
