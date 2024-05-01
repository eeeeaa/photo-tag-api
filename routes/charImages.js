const express = require("express");
const router = express.Router();

const char_image_controller = require("../controllers/charImageController");
const character_controller = require("../controllers/characterController");

//Char image routes
router.get("/", char_image_controller.char_images_get);

router.get("/:id", char_image_controller.char_images_get_one);

router.post("/", char_image_controller.char_images_post);

router.put("/:id", char_image_controller.char_images_put);

router.delete("/:id", char_image_controller.char_images_delete);

//Character routes
router.get("/:charImageId/characters", character_controller.characters_get);

router.get(
  "/:charImageId/characters/:charId",
  character_controller.characters_get_one
);

router.post("/:charImageId/characters", character_controller.characters_post);

router.put(
  "/:charImageId/characters/:charId",
  character_controller.characters_put
);

router.delete(
  "/:charImageId/characters/:charId",
  character_controller.characters_delete
);

module.exports = router;
