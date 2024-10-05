const mongoose = require("mongoose");

const DashboardCardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  extraData: {
    type: Array,
  },
});

module.exports = mongoose.model("DashboardCards", DashboardCardSchema);
