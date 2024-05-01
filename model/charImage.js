const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharImageSchema = new Schema({
  image_url: { type: String, require: true },
  image_width: { type: Number, require: true },
  image_height: { type: Number, require: true },
});

module.exports = mongoose.model("CharImage", CharImageSchema);
