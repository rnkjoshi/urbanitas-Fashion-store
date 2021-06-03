const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: { type: String, require: true },
  address: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: Number, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
  shops: [{ type: mongoose.Types.ObjectId, required: true, ref: "Shop" }],
});

ownerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Owner", ownerSchema);
