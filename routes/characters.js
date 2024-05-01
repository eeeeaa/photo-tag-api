const express = require("express");
const router = express.Router({ mergeParams: true });

const character_controller = require("../controllers/characterController");

router.get("/characters", character_controller.characters_get);

router.get("/characters/:charId", character_controller.characters_get_one);

router.post("/characters", character_controller.characters_post);

router.put("/characters/:charId", character_controller.characters_put);

router.delete("/characters/:charId", character_controller.characters_delete);

module.exports = router;
