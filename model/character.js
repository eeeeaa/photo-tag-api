const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  char_name: { type: String, require: true },
  char_x: { type: Number, require: true },
  char_y: { type: Number, require: true },
});

module.exports = mongoose.model("Character", CharacterSchema);
