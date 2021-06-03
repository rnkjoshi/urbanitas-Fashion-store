// const { validationResult } = require("express-validator");

// const HttpError = require("../models/http-error");
// const User = require("../models/user");

// const getAllUsers = async (req, res, next) => {
//   let users;
//   try {
//     users = await User.find({}, "-password");
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   res.json({ users: users.map((user) => user.toObject({ getters: true })) });
// };

// const getUserById = async (req, res, next) => {
//   const userId = req.params.uid;

//   let requiredUser;
//   try {
//     requiredUser = await User.findById(userId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not find the user.",
//       500
//     );
//     return next(error);
//   }
//   if (!requiredUser) {
//     const error = new HttpError("User not found with provided id.", 500);
//     return next(error);
//   }

//   res.json({ requiredUser: requiredUser.toObject({ getters: true }) });
// };

// const signupUser = async (req, res, next) => {
//   const { name, email, password, role } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError(
//       "Signing up failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (existingUser) {
//     const error = new HttpError(
//       "User exists already, please login instead.",
//       422
//     );
//     return next(error);
//   }

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log(errors);
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }

//   const createdUser = new User({
//     name,
//     address,
//     email,
//     phone,
//     password,
//     role,
//   });

//   try {
//     await createdUser.save();
//   } catch (err) {
//     const error = new HttpError(
//       "Signing up failed, please try again later.",
//       500
//     );
//     return next(error);
//   }
//   res
//     .status(201)
//     .json({ createdUser: createdUser.toObject({ getters: true }) });
// };

// const loginUser = async (req, res, next) => {
//   const { email, password } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError(
//       "Logging in failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (!existingUser || existingUser.password != password) {
//     const error = new HttpError(
//       "Invalid credentials, could not log you in.",
//       401
//     );
//     return next(error);
//   }

//   res.status(200).json({ message: "Logged in!" });
// };

// const updateUser = async (req, res, next) => {
//   const userId = req.params.uid;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }

//   const { address, phone, password } = req.body;

//   let user;
//   try {
//     user = await User.findById(userId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not find the user.",
//       500
//     );
//     return next(error);
//   }

//   user.address = address;
//   user.phone = phone;
//   user.password = password;

//   try {
//     await user.save();
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not update the user.",
//       500
//     );
//     return next(error);
//   }

//   res.json({
//     message: "User updated successfully.",
//     updatedUser: user.toObject({ getters: true }),
//   });
// };

// const deleteUser = async (req, res, next) => {
//   const userId = req.params.uid;

//   let user;
//   try {
//     user = await User.findById(userId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, user could not be found.",
//       500
//     );
//     return next(error);
//   }

//   try {
//     await user.remove();
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not delete user.",
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ message: "User deleted successfully." });
// };

// exports.getAllUsers = getAllUsers;
// exports.getUserById = getUserById;
// exports.signupUser = signupUser;
// exports.loginUser = loginUser;
// exports.updateUser = updateUser;
// exports.deleteUser = deleteUser;
