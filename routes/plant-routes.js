const router = require("express").Router();
const plantController = require("../controllers/plantController");

router.post("", plantController.createPlant);
router.get("/all", plantController.getAllPlants);

module.exports = router;
