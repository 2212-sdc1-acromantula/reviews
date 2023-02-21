const db = require('../db/index.js');


exports.getReviews = (query) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM reviews
    WHERE product_id=${query.product_id}
    ORDER BY helpfulness DESC
    LIMIT ${query.count}
    OFFSET ${query.page};`
    )
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
};

exports.markHelpful = (review_id) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE reviews
    SET helpfulness = helpfulness + 1
    WHERE review_id=${review_id};`
    )
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    })
  })
};

// UPDATE totals
//    SET total = total + 1
// WHERE name = 'bill'