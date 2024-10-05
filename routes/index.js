const express = require("express");
const router = express.Router();

const parkRoutes = require("./park-routes");
const authRoutes = require("./auth-routes");
const plantRoutes = require("./plant-routes");

router.use("/parks", parkRoutes);
router.use("/auth", authRoutes);
router.use("/plants", plantRoutes);

module.exports = router;
