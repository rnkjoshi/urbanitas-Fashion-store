const fs = require("fs");

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Dress = require("../models/dress");
const Shop = require("../models/shop");

const getAllDresses = async (req, res, next) => {
  console.log("getting dresses.")
  let dresses;
  try {
    dresses = await Dress.find({});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later",
      500
    );
    return next(error);
  }
  Dress.
  find().
  exec((err,articles)=>{
    if(err) return res.status(400).send(err);
    console.log("Got dresses.")
    res.send(articles);
  })
  // res.json({
  //   dresses: dresses.map((dress) => dress.toObject({ getters: true })),
  // });
};

const getDressesByShopId = async (req, res, next) => {
  const shopId = req.params.sid;

  let shop;
  try {
    shop = await Shop.findById(shopId).populate("dresses");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }
  if (!shop || shop.dresses.length === 0) {
    return next(
      new HttpError(
        "Something went wrong, either shop was not found with provided shop id or the shop has no dresses.",
        404
      )
    );
  }

  res.json({
    dresses: shop.dresses.map((dress) => dress.toObject({ getters: true })),
  });
};

const createDress = async (req, res, next) => {
  const shopId = req.params.sid;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, price, category, quantity } = req.body;
  const createdDress = new Dress({
    title,
    image: req.file.path,
    description,
    price,
    category,
    quantity,
    shop: shopId,
  });

  let shop;
  try {
    shop = await Shop.findById(shopId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!shop) {
    const error = new HttpError("Could not find shop for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdDress.save({ session: sess });
    shop.dresses.push(createdDress);
    await shop.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Adding dress failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({
    message: "Dress added successfully.",
    createdDress: createdDress.toObject({ getters: true }),
  });
};

const updateDress = async (req, res, next) => {
  const dressId = req.params.did;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, image, description, price, category, quantity } = req.body;

  let dress;
  try {
    dress = await Dress.findById(dressId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the dress.",
      500
    );
    return next(error);
  }

  const imagePath = dress.image;
  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  dress.title = title;
  dress.image = req.file.path;
  dress.description = description;
  dress.price = price;
  dress.category = category;
  dress.quantity = quantity;

  try {
    await dress.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the dress.",
      500
    );
    return next(error);
  }

  res.json({
    message: "Dress updated",
    dress: dress.toObject({ getters: true }),
  });
};

const deleteDress = async (req, res, next) => {
  const dressId = req.params.did;

  let dress;
  try {
    dress = await Dress.findById(dressId).populate("shop");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!dress) {
    const error = new HttpError("Could not find dress for provided id.", 404);
    return next(error);
  }

  const imagePath = dress.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await dress.remove({ session: sess });
    dress.shop.dresses.pull(dress);
    await dress.shop.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete dress.",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Dress deleted successfully." });
};

exports.getAllDresses = getAllDresses;
exports.getDressesByShopId = getDressesByShopId;
exports.createDress = createDress;
exports.updateDress = updateDress;
exports.deleteDress = deleteDress;
