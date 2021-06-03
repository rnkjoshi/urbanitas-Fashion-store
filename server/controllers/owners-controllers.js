const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Owner = require("../models/owner");

const getAllOwners = async (req, res, next) => {
  let owners;
  try {
    owners = await Owner.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    owners: owners.map((owner) => owner.toObject({ getters: true })),
  });
};

const getOwnerById = async (req, res, next) => {
  const ownerId = req.params.oid;

  let requiredOwner;
  try {
    requiredOwner = await Owner.findById(ownerId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the owner.",
      500
    );
    return next(error);
  }
  if (!requiredOwner) {
    const error = new HttpError("Owner not found with provided id.", 500);
    return next(error);
  }

  res.json({ requiredOwner: requiredOwner.toObject({ getters: true }) });
};

const signupOwner = async (req, res, next) => {
  const { name, address, email, phone, password, role } = req.body;

  let existingOwner;
  try {
    existingOwner = await Owner.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingOwner) {
    const error = new HttpError(
      "Owner exists already, please login instead.",
      422
    );
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const createdOwner = new Owner({
    name,
    address,
    email,
    phone,
    password,
    role,
    shops: [],
  });

  try {
    await createdOwner.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ createdOwner: createdOwner.toObject({ getters: true }) });
};

const loginOwner = async (req, res, next) => {
  const { email, password } = req.body;

  let existingOwner;
  try {
    existingOwner = await Owner.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingOwner || existingOwner.password != password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  res.status(200).json({ message: "Logged in!" });
};

const updateOwner = async (req, res, next) => {
  const ownerId = req.params.oid;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { address, phone, password } = req.body;

  let owner;
  try {
    owner = await Owner.findById(ownerId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the owner.",
      500
    );
    return next(error);
  }

  owner.address = address;
  owner.phone = phone;
  owner.password = password;

  try {
    await owner.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the owner.",
      500
    );
    return next(error);
  }

  res.json({
    message: "Owner updated successfully.",
    updatedOwner: owner.toObject({ getters: true }),
  });
};

const deleteOwner = async (req, res, next) => {
  const ownerId = req.params.oid;

  let owner;
  try {
    owner = await Owner.findById(ownerId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, owner could not be found.",
      500
    );
    return next(error);
  }

  try {
    await owner.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete owner.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Owner." });
};

exports.getAllOwners = getAllOwners;
exports.getOwnerById = getOwnerById;
exports.signupOwner = signupOwner;
exports.loginOwner = loginOwner;
exports.updateOwner = updateOwner;
exports.deleteOwner = deleteOwner;
