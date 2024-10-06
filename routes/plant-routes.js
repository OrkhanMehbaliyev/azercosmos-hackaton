const router = require("express").Router();
const plantController = require("../controllers/plantController");

router.post("", plantController.createPlant);
router.get("/all", plantController.getAllPlants);
router.get("/:id", plantController.getPlantById);

module.exports = router;
