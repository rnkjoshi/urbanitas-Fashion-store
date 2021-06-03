const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const shopsControllers = require("../controllers/shops-controllers");

//get all shops
router.get("/", shopsControllers.getAllShops);

//get shops by id
router.get("/:sid", shopsControllers.getShopsById);

//get shops by owner
router.get("/owners/:oid", shopsControllers.getShopsByOwner);

//add new shop
router.post(
  "/:oid",
  [
    check("name").matches(/^[A-Za-z\d]/),
    check("address").matches(/^[A-Za-z\d]/),
    check("location").notEmpty(),
  ],
  shopsControllers.createShop
);

//delete shop
router.delete("/:sid", shopsControllers.deleteShop);

module.exports = router;
