const express = require("express");
const router = express.Router();

const char_image_controller = require("../controllers/charImageController");

router.get("/", char_image_controller.char_images_get);

router.get("/:id", char_image_controller.char_images_get_one);

router.post("/", char_image_controller.char_images_post);

router.put("/:id", char_image_controller.char_images_put);

router.delete("/:id", char_image_controller.char_images_delete);

module.exports = router;
