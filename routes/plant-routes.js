const router = require("express").Router();
const plantController = require("../controllers/plantController");

router.post("", plantController.createPlant);
router.get("/all", plantController.getAllPlants);
router.get("/:id", plantController.getPlantById);
router.post("/file", plantController.getPlantByFile);

module.exports = router;
