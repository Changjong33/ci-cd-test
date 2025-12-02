const express = require("express");
const router = express.Router();
const dogsController = require("../controllers/dogsController");
const validateDog = require("../middlewares/validateDog");

// Routes
router.get("/", dogsController.getDogs);
router.post("/", validateDog, dogsController.addDog);
router.delete("/:id", dogsController.deleteDog);
router.put("/:id", validateDog, dogsController.updateDog);

module.exports = router;
