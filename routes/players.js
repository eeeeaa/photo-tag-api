const express = require("express");
const router = express.Router();

const player_controller = require("../controllers/playerController");

router.get("/", player_controller.players_get);

router.get("/:id", player_controller.players_get_one);

router.post("/", player_controller.players_post);

router.put("/:id", player_controller.player_put);

router.delete("/:id", player_controller.player_delete);

module.exports = router;
