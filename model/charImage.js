const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharImageSchema = new Schema({
  image_url: { type: String, require: true },
  characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
});

module.exports = mongoose.model("CharImage", CharImageSchema);
