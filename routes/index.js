const express = require("express");
const router = express.Router();

const parkRoutes = require("./park-routes");
const authRoutes = require("./auth-routes");

router.use("/parks", parkRoutes);
router.use("/auth", authRoutes);

module.exports = router;
