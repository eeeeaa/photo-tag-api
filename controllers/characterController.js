const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const {
  validationErrorHandler,
  validCharImageIdErrorHandler,
  validCharIdErrorHandler,
} = require("../handler/validationErrorHandler");

const CharImage = require("../model/charImage");
const Character = require("../model/character");

exports.characters_get = [
  validCharImageIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [charImage, characters] = await Promise.all([
      CharImage.findById(req.params.charImageId, "_id").exec(),
      Character.find({ charImage: req.params.charImageId }).exec(),
    ]);
    if (charImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    return res.json({
      characters: characters,
    });
  }),
];

exports.characters_get_one = [
  validCharImageIdErrorHandler,
  validCharIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [charImage, character] = await Promise.all([
      CharImage.findById(req.params.charImageId, "_id").exec(),
      Character.findById(req.params.charId).exec(),
    ]);

    if (charImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    if (character === null) {
      const err = new Error("character not found");
      err.status = 404;
      return next(err);
    }

    return res.json({
      character: character,
    });
  }),
];

exports.characters_post = [
  validCharImageIdErrorHandler,
  body("char_profile_url").trim().isLength({ min: 1 }),
  body("char_name").trim().isLength({ min: 1 }).escape(),
  body("char_x").exists().isNumeric({ min: 0, max: 1 }),
  body("char_y").exists().isNumeric({ min: 0, max: 1 }),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const charImage = await CharImage.findById(
      req.params.charImageId,
      "_id"
    ).exec();

    if (charImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    const character = new Character({
      charImage: req.params.charImageId,
      char_profile_url: req.body.char_profile_url,
      char_name: req.body.char_name,
      char_x: req.body.char_x,
      char_y: req.body.char_y,
    });

    await character.save();

    return res.json({
      character: character,
    });
  }),
];

exports.characters_put = [
  validCharImageIdErrorHandler,
  validCharIdErrorHandler,
  body("char_profile_url")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 1 }),
  body("char_name")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("char_x")
    .optional({ values: "falsy" })
    .exists()
    .isNumeric({ min: 0, max: 1 }),
  body("char_y")
    .optional({ values: "falsy" })
    .exists()
    .isNumeric({ min: 0, max: 1 }),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [charImage, existCharacter] = await Promise.all([
      CharImage.findById(req.params.charImageId, "_id").exec(),
      Character.findById(req.params.charId).exec(),
    ]);

    if (charImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    if (existCharacter === null) {
      const err = new Error("character not found");
      err.status = 404;
      return next(err);
    }

    const character = new Character({
      _id: req.params.charId,
      charImage: req.params.charImageId,
      char_profile_url: req.body.char_profile_url,
      char_name: req.body.char_name,
      char_x: req.body.char_x,
      char_y: req.body.char_y,
    });

    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.charId,
      character,
      { new: true }
    );

    return res.json({
      updatedCharacter: updatedCharacter,
    });
  }),
];

exports.characters_delete = [
  validCharImageIdErrorHandler,
  validCharIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [charImage, existCharacter] = await Promise.all([
      CharImage.findById(req.params.charImageId, "_id").exec(),
      Character.findById(req.params.charId).exec(),
    ]);

    if (charImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    if (existCharacter === null) {
      const err = new Error("character not found");
      err.status = 404;
      return next(err);
    }

    const deletedCharacter = await Character.findByIdAndDelete(
      req.params.charId
    );

    return res.json({
      deletedCharacter: deletedCharacter,
    });
  }),
];
