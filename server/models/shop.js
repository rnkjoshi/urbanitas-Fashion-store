const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "Owner" },
  dresses: [{ type: mongoose.Types.ObjectId, required: true, ref: "Dress" }],
});

module.exports = mongoose.model("Shop", shopSchema);
