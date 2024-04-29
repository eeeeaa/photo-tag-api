const asyncHandler = require("express-async-handler");
const { body } = require("express-validator");

exports.char_images_get = asyncHandler(async (req, res, next) => {
  res.json({ message: "NOT IMPLEMENTED: get char images" });
});

exports.char_images_get_one = asyncHandler(async (req, res, next) => {
  res.json({
    message: "NOT IMPLEMENTED: get one char image",
    id: req.params.id,
  });
});

exports.char_images_post = asyncHandler(async (req, res, next) => {
  res.json({
    message: "NOT IMPLEMENTED: create char image",
  });
});

exports.char_images_put = asyncHandler(async (req, res, next) => {
  res.json({
    message: "NOT IMPLEMENTED: update char image",
    id: req.params.id,
  });
});

exports.char_images_delete = asyncHandler(async (req, res, next) => {
  res.json({
    message: "NOT IMPLEMENTED: delete char image",
    id: req.params.id,
  });
});
