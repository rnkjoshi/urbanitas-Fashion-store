const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Shop = require("../models/shop");
const Owner = require("../models/owner");

const getAllShops = async (req, res, next) => {
  let shops;
  try {
    shops = await Shop.find({});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  res.json({ shops: shops.map((shop) => shop.toObject({ getters: true })) });
};

const getShopsById = async (req, res, next) => {
  const shopId = req.params.sid;

  let requiredShop;
  try {
    requiredShop = await Shop.findById(shopId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the shop.",
      500
    );
    return next(error);
  }
  if (!requiredShop) {
    const error = new HttpError("Shop not found with provided id.", 500);
    return next(error);
  }

  res.json({ requiredShop: requiredShop.toObject({ getters: true }) });
};

const getShopsByOwner = async (req, res, next) => {
  const shopOwner = req.params.oid;

  let owner;
  try {
    owner = await Owner.findById(shopOwner).populate("shops");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }
  if (!owner || owner.shops.length === 0) {
    const error = new HttpError(
      "Something went wrong, either owner was not found with provided owner id or the owner has no shops.",
      404
    );
    return next(error);
  }

  res.json({
    Shops: owner.shops.map((shop) => shop.toObject({ getters: true })),
  });
};

const createShop = async (req, res, next) => {
  const ownerId = req.params.oid;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, address, coordinates } = req.body;
  const createdShop = new Shop({
    name,
    address,
    location: coordinates,
    owner: ownerId,
  });

  let owner;
  try {
    owner = await Owner.findById(ownerId);
  } catch (err) {
    const error = new HttpError("Creating shop failed, please try again.", 500);
    return next(error);
  }

  if (!owner) {
    const error = new HttpError("Could not find owner for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdShop.save({ session: sess });
    owner.shops.push(createdShop);
    await owner.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating shop failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({
    message: "Shop created successfully.",
    createdShop: createdShop.toObject({ getters: true }),
  });
};

const deleteShop = async (req, res, next) => {
  const shopId = req.params.sid;

  let shop;
  try {
    shop = await Shop.findById(shopId).populate("owner");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!shop) {
    const error = new HttpError("Could not find shop for provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await shop.remove({ session: sess });
    shop.owner.shops.pull(shop);
    await shop.owner.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete shop.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Shop deleted successfully." });
};

exports.getAllShops = getAllShops;
exports.getShopsById = getShopsById;
exports.getShopsByOwner = getShopsByOwner;
exports.createShop = createShop;
exports.deleteShop = deleteShop;
