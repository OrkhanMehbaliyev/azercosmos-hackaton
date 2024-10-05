const router = require("express").Router();
const parkController = require("../controllers/parkController");

router.post("", parkController.createPark);
router.get("/all", parkController.getAllParks);
router.get("/:id", parkController.getParkById);

module.exports = router;
