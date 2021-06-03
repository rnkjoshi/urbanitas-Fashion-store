const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const ownersControllers = require("../controllers/owners-controllers");

//get all owners
router.get("/", ownersControllers.getAllOwners);

//get owner by id
router.get("/:oid", ownersControllers.getOwnerById);

//sign up new owner
router.post(
  "/signup",
  [
    check("name").matches(/^[A-Za-z][A-Za-z\s.-]*$/),
    check("address").matches(/^[A-Za-z\d]/),
    check("email").normalizeEmail().isEmail(),
    check("phone").isNumeric().isLength({ min: 10, max: 10 }),
    check("password").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@#!$%^&*._-]{8,}$/,
      "i"
    ),
    check("role").notEmpty(),
  ],
  ownersControllers.signupOwner
);

//login owner
router.post("/login", ownersControllers.loginOwner);

//update owner
router.patch(
  "/update/:oid",
  [
    check("address").matches(/^[A-Za-z\d]/),
    check("phone").isNumeric().isLength({ min: 10, max: 10 }),
    check("password").matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@#!$%^&*._-]{8,}$/,
      "i"
    ),
  ],
  ownersControllers.updateOwner
);

//delete owner
router.delete("/:oid", ownersControllers.deleteOwner);

module.exports = router;
