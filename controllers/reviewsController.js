const reviewsModel = require("../models/reviewsModel.js");


exports.getReviews = (req, res) => {

  let query = {
    product_id: Number(req.query.product_id),
    page: Number(req.query.page),
    count: Number(req.query.count),
    sort: req.query.sort
  }

  reviewsModel.getReviews(query)
  .then((result) => {
    res.status(200).send(result.rows);
  })
  .catch((err) => {
    res.status(501).send(err);
  });
};

exports.postReview = (req, res) => {
  res.send("NOT IMPLEMENTED: postReview");
};

exports.markHelpful = (req, res) => {
  console.log('this is req.params: ', req.params);
  reviewsModel.markHelpful(Number(req.params.review_id))
  .then((result) => {
    res.status(200).send(result.rows);
  })
  .catch((err) => {
    res.status(501).send(err);
  });
};

exports.report = (req, res) => {
  res.send("NOT IMPLEMENTED: report");
};