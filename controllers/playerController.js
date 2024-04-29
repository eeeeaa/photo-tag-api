const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");

exports.players_get = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: get players" });
});

exports.players_get_one = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: get one player", id: req.params.id });
});

exports.players_post = asyncHandler(async (req, res, next) => {
  res.json({ message: `NOT IMPLEMENTED: create player` });
});

exports.player_put = asyncHandler(async (req, res, next) => {
  res.json({ message: `NOT IMPLEMENTED: update player`, id: req.params.id });
});

exports.player_delete = asyncHandler(async (req, res, next) => {
  res.json({ message: `NOT IMPLEMENTED: delete player`, id: req.params.id });
});
