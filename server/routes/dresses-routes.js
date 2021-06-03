const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const dressesControllers = require("../controllers/dresses-controllers");
// const fileUpload = require("../middleware/file-upload");
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });
//get all dresses
 router.get("/", dressesControllers.getAllDresses);
 
//get dresses by shop id
router.get("/shop/:sid", dressesControllers.getDressesByShopId);

// //add new dress
// router.post(
//   "/:sid",
//   fileUpload.single("image"),
//   [
//     check("title").matches(/^[A-Za-z\d]/),
//     check("description")
//       .matches(/^[A-Za-z\d]/)
//       .isLength({ min: 5 }),
//     check("price").isFloat(),
//     check("category").notEmpty(),
//     check("quantity").isNumeric(),
//   ],
//   dressesControllers.createDress
// );

// //update dress
// router.patch(
//   "/:did",
//   fileUpload.single("image"),
//   [
//     check("title").matches(/^[A-Za-z\d]/),
//     check("description")
//       .matches(/^[A-Za-z\d]/)
//       .isLength({ min: 5 }),
//     check("price").isFloat(),
//     check("category").notEmpty(),
//     check("quantity").isNumeric(),
//   ],
//   dressesControllers.updateDress
// );

//delete dress
// router.delete("/:did", dressesControllers.deleteDress);

module.exports = router;
