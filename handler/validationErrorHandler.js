const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

exports.validationErrorHandler = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res
      .status(400)
      .json({ errors: err.formatWith((error) => error.msg).array() });
  } else {
    next();
  }
};

exports.validIdErrorHandler = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
  } else {
    const err = new Error("invalid id");
    err.status = 400;
    return next(err);
  }
};

exports.validCharImageIdErrorHandler = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.charImageId)) {
    next();
  } else {
    const err = new Error("invalid id");
    err.status = 400;
    return next(err);
  }
};

exports.validCharIdErrorHandler = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.charId)) {
    next();
  } else {
    const err = new Error("invalid id");
    err.status = 400;
    return next(err);
  }
};
