const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");
const {
  validationErrorHandler,
  validIdErrorHandler,
} = require("../handler/validationErrorHandler");

const CharImage = require("../model/charImage");
const Character = require("../model/character");

exports.char_images_get = asyncHandler(async (req, res, next) => {
  const charImages = await CharImage.find({}).exec();

  return res.json({ charImages: charImages });
});

exports.char_images_get_one = [
  validIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const charImage = await CharImage.findById(req.params.id).exec();
    if (charImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }
    res.json({
      charImage: charImage,
    });
  }),
];

exports.char_images_validate_position = [
  body("char_x").exists().isNumeric({ min: 0, max: 1 }),
  body("char_y").exists().isNumeric({ min: 0, max: 1 }),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const [charImage, characters] = await Promise.all([
      CharImage.findById(req.params.id).exec(),
      Character.find({ charImage: req.params.id }).exec(),
    ]);

    const normalRange = 0.005;

    const inRange = (x, min, max) => {
      return (x - min) * (x - max) <= 0;
    };

    if (charImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    for (const character of characters) {
      if (
        inRange(
          character.char_x,
          req.body.char_x - normalRange,
          req.body.char_x + normalRange
        ) &&
        inRange(
          character.char_y,
          req.body.char_y - normalRange,
          req.body.char_y + normalRange
        )
      ) {
        return res.json({ character: character });
      }
    }

    return res.json({
      message: "position not in range of any characters",
    });
  }),
];

exports.char_images_post = [
  body("image_url")
    .trim()
    .isLength({ min: 1 })
    .withMessage("image resource url must not be empty"),
  body("image_width").exists().isNumeric(),
  body("image_height").exists().isNumeric(),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const charImage = new CharImage({
      image_url: req.body.image_url,
      image_width: req.body.image_width,
      image_height: req.body.image_height,
    });

    await charImage.save();

    res.json({
      charImage: charImage,
    });
  }),
];

exports.char_images_put = [
  validIdErrorHandler,
  body("image_url")
    .trim()
    .isLength({ min: 1 })
    .withMessage("image resource url must not be empty"),
  body("image_width").exists().isNumeric(),
  body("image_height").exists().isNumeric(),
  validationErrorHandler,
  asyncHandler(async (req, res, next) => {
    const existCharImage = await CharImage.findById(req.params.id).exec();
    if (existCharImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    const charImage = new CharImage({
      image_url: req.body.image_url,
      image_width: req.body.image_width,
      image_height: req.body.image_height,
      _id: req.params.id,
    });

    const updatedCharImage = await CharImage.findByIdAndUpdate(
      req.params.id,
      charImage,
      { new: true }
    );
    res.json({
      updatedCharImage: updatedCharImage,
    });
  }),
];

exports.char_images_delete = [
  validIdErrorHandler,
  asyncHandler(async (req, res, next) => {
    const existCharImage = await CharImage.findById(req.params.id).exec();
    if (existCharImage === null) {
      const err = new Error("char image not found");
      err.status = 404;
      return next(err);
    }

    const [deletedCharImage, characters] = await Promise.all([
      CharImage.findByIdAndDelete(req.params.id),
      Character.deleteMany({ charImage: req.params.id }),
    ]);
    res.json({
      deletedCharImage: deletedCharImage,
      deletedCharacterCount: characters.deletedCount,
    });
  }),
];
