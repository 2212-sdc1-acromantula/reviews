const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController.js");

//MIDDLEWARE FOR REVIEWS //
router.use(express.json());

/// REVIEW ROUTES //

router.get("/", reviewsController.getReviews);

router.post("/", reviewsController.postReview);

router.put("/:review_id/helpful", reviewsController.markHelpful);

router.put("/:review_id/report", reviewsController.report);

router.get("/meta", reviewsController.meta);

module.exports = router;