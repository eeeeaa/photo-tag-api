const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const {
  validationErrorHandler,
  validIdErrorHandler,
} = require("../handler/validationErrorHandler");

const Player = require("../model/player");

exports.players_get = asyncHandler(async (req, res, next) => {
  let allPlayers = await Player.find().limit(req.query.limit).exec();
  if (req.query.includeInProgress === undefined) {
    allPlayers = allPlayers.filter((val) => {
      if (val.has_game_end) {
        return val;
      }
    });
  }
  res.json({ players: allPlayers });
});

exports.players_get_one = [
  validIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id).exec();

    if (player === null) {
      const err = new Error("player not found");
      err.status = 404;
      return next(err);
    }
    res.json({ player: player });
  }),
];

exports.players_post = [
  body("player_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("player_name must not be empty")
    .escape(),
  body("start_time").optional({ values: "falsy" }).isISO8601().toDate(),
  body("end_time").optional({ values: "falsy" }).isISO8601().toDate(),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const player = new Player({
      player_name: req.body.player_name,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    });

    await player.save();
    res.json({ player: player });
  }),
];

exports.player_put = [
  validIdErrorHandler,
  body("player_name")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 1 })
    .withMessage("player_name must not be empty")
    .escape(),
  body("start_time").optional({ values: "falsy" }).isISO8601().toDate(),
  body("end_time").optional({ values: "falsy" }).isISO8601().toDate(),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const existPlayer = await Player.findById(req.params.id).exec();
    if (existPlayer === null) {
      const err = new Error("player not found");
      err.status = 404;
      return next(err);
    }

    const player = new Player({
      player_name: req.body.player_name,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      _id: req.params.id,
    });

    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      player,
      { new: true }
    );
    res.json({ updatedPlayer: updatedPlayer });
  }),
];

exports.player_delete = [
  validIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const player = await Player.findById(req.params.id).exec();
    if (player === null) {
      const err = new Error("player not found");
      err.status = 404;
      return next(err);
    }

    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

    res.json({ deletedPlayer: deletedPlayer });
  }),
];
