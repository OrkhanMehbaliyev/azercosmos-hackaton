const router = require("express").Router();
const reviewController = require("../controllers/reviewController");

router.get("", reviewController.getAllReviews);
router.post("", reviewController.createReview);

module.exports = router;
