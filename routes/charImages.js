const express = require("express");
const router = express.Router();
const characterRouter = require("./characters");

const char_image_controller = require("../controllers/charImageController");

//Char image routes
router.get("/", char_image_controller.char_images_get);

router.get("/:id", char_image_controller.char_images_get_one);

router.post("/", char_image_controller.char_images_post);

router.post(
  "/:id/validate-position",
  char_image_controller.char_images_validate_position
);

router.put("/:id", char_image_controller.char_images_put);

router.delete("/:id", char_image_controller.char_images_delete);

//Character routes
router.use("/:charImageId", characterRouter);

module.exports = router;
