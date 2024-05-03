const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  player_name: { type: String, required: true },
  start_time: { type: Date, default: Date.now, index: { expires: "3h" } },
  end_time: { type: Date },
});

PlayerSchema.virtual("has_game_end").get(function () {
  return this.end_time !== undefined;
});

PlayerSchema.virtual("time_spent_milliseconds").get(function () {
  if (this.end_time === undefined) return null;
  return this.end_time - this.start_time;
});

module.exports = mongoose.model("Player", PlayerSchema);
