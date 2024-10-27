const express = require("express");
const router = express.Router();

const parkRoutes = require("./park-routes");
const authRoutes = require("./auth-routes");
const plantRoutes = require("./plant-routes");
const galleryRoutes = require("./gallery-routes");
const reportRoutes = require("./report-routes");
const reviewRouter = require("./review-routes");

router.use("/auth", authRoutes);
router.use("/parks", parkRoutes);
router.use("/plants", plantRoutes);
router.use("/gallery", galleryRoutes);
router.use("/reports", reportRoutes);
router.use("/reviews", reviewRouter);

module.exports = router;
