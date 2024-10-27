const router = require("express").Router();
const reportController = require("../controllers/reportController");

router.post("", reportController.createReport);
router.get("/all", reportController.getAllReports);
router.get("/types", reportController.getReportTypes);
router.get("/:id", reportController.getReportById);
router.delete("/:id", reportController.deleteReportById);

module.exports = router;
