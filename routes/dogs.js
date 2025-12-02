const express = require("express");
const router = express.Router();
const dogsController = require("../controllers/dogsController");

// Routes
router.get("/", dogsController.getDogs);
router.post("/", dogsController.addDog);
router.delete("/:id", dogsController.deleteDog);
router.put("/:id", dogsController.updateDog);

module.exports = router;
