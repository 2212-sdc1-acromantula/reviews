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
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(501).send(err);
  });
};

exports.postReview = (req, res) => {
  reviewsModel.postReview(req.body)
  .then((result) => {
    res.status(201).send(result);
  })
  .catch((err) => {
    console.log('this is err in controllers: ', err);
    res.status(501).send(err);
  });
};

exports.markHelpful = (req, res) => {
  reviewsModel.markHelpful(Number(req.params.review_id))
  .then((result) => {
    res.status(204).send(result);
  })
  .catch((err) => {
    res.status(501).send(err);
  });
};

exports.report = (req, res) => {
  reviewsModel.report(Number(req.params.review_id))
  .then((result) => {
    res.status(204).send(result.rows);
  })
  .catch((err) => {
    res.status(501).send(err);
  });
};

exports.meta = async (req, res) => {

try {

  let query = {
    product_id: Number(req.query.product_id)
  }

  let resultArray = await reviewsModel.meta(query);

  let returnObject = {
    product_id: req.query.product_id,
    ratings: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    recommended: {
      0: 0,
      1: 0
    },
    characteristics: {}
  }

  let averageRating = 0;
  let sum = 0;
  let goodRecommend = 0;
  let badRecommend = 0;
  resultArray[0].forEach((entry) => {
    returnObject.ratings[entry.rating.toString()]++;
    if (entry.recommend) {
      returnObject.recommended[1]++;
    } else {
      returnObject.recommended[0]++;
    }
  });

  resultArray[1].forEach((entry) => {
    entry.name_actual = JSON.parse(entry.name_actual);
  })

  resultArray[1].forEach((entry) => {
    if (returnObject.characteristics[entry.name_actual] === undefined) {
      returnObject.characteristics[entry.name_actual] = {
        id: entry.characteristic_id,
        value: entry.value/resultArray[0].length
      }
    } else {
      returnObject.characteristics[entry.name_actual].value += (entry.value/resultArray[0].length);
    }
  })

  res.status(200).send(returnObject);

} catch(err) {
  console.log('error in reviewsController.meta: ', err)
  res.status(501).send(err);
}

};