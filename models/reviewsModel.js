const db = require('../db/index.js');


exports.getReviews = async (query) => {

  try {
    let ordering = "";
    if (query.sort === 'Helpful' || query.sort === 'Relevant') {
      ordering = "helpfulness";
    } else {
      ordering = "date";
    }
    let reviewsListObject = await db.query(`SELECT * FROM reviews
    WHERE product_id=${query.product_id} AND reported=false
    ORDER BY ${ordering} DESC
    LIMIT ${query.count}
    OFFSET ${query.page};`
    )
    let reviewsList = reviewsListObject.rows;

    let photoListObject = await db.query(`SELECT review_id_reviews, url, id FROM combined_photos WHERE product_id=${query.product_id}`)
    let photoList = photoListObject.rows;

      reviewsList.forEach((reviewEntry) => {
        reviewEntry['photos'] = [];
        reviewEntry['summary'] = JSON.parse(reviewEntry['summary']);
        reviewEntry['response'] = JSON.parse(reviewEntry['response']);
        reviewEntry['body'] = JSON.parse(reviewEntry['body']);
        reviewEntry['reviewer_name'] = JSON.parse(reviewEntry['reviewer_name']);
        reviewEntry['reviewer_email'] = JSON.parse(reviewEntry['reviewer_email']);
        photoList.forEach((photoEntry) => {
          if (reviewEntry.review_id === photoEntry.review_id_reviews) {
            reviewEntry['photos'].push({
              id: photoEntry.id,
              url: JSON.parse(photoEntry.url)
            })
          }
        })
      })

      return reviewsList;
    } catch(err) {
      console.log('error in getReviewsModel: ', err);
      return err;
    }

};


exports.postReview = async body => {

  let getMaxReview = await db.query('SELECT max(review_id) FROM reviews;');
  let maxReview = getMaxReview.rows[0].max + 1;

  let getMaxPhoto = await db.query('SELECT max(id) FROM combined_photos;');
  let maxPhoto = getMaxPhoto.rows[0].max + 1;

  let getMaxCombined = await db.query('SELECT max(id) FROM combined;');
  let maxCombined = getMaxCombined.rows[0].max + 1;

  let reviewsPromise = new Promise((resolve, reject) => {
    db.query(`INSERT INTO reviews (review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES(${maxReview}, ${body.product_id}, ${body.rating}, '${Date.now()}', '${body.summary}', '${body.body}', ${true}, ${false}, '${body.name}', '${body.email}', '${""}', ${0}) ON CONFLICT DO NOTHING RETURNING review_id`
    )
    .then((result) => {
      resolve('Insert into reviews OK');
    })
    .catch((err) => {
      console.log('this is a postReviewError: ', err);
      reject(err);
    })
  })


   let photosPromise = new Promise((resolve, reject) => {
    let photoArray = body.photos.map(async (entry) => {
       //console.log('this is entry: ', entry);
      await db.query(`INSERT INTO combined_photos (id, review_id_reviews, url, product_id) VALUES(${maxPhoto}, ${maxReview}, '${entry}', ${body.product_id}) ON CONFLICT DO NOTHING`
      )
      .catch((err) => {
        console.log('this is a photoPromise error: ', err);
        reject(err);
      })
      maxPhoto++;
    })
      resolve('Insert into photos OK');
  })

  let characteristicsPromise = new Promise((resolve, reject) => {
    Object.keys(body.characteristics).forEach(async (key) => {

      let name = await db.query(`SELECT name_actual FROM characteristic_values WHERE id=${key} LIMIT 1`)

      await db.query(`INSERT INTO combined (id, characteristic_id, review_id_reviews, product_id, name_actual, value) VALUES(${maxCombined}, ${key}, ${maxReview}, ${body.product_id}, '${name.rows[0].name_actual}', ${body.characteristics[key]}) ON CONFLICT DO NOTHING`
      )
      .catch((err) => {
        console.log('this is a characteristicPromise error: ', err);
        reject(err);
      })
      maxCombined++;
    })
      resolve('Insert into characteristics OK');

  })

  Promise.all([reviewsPromise, photosPromise, characteristicsPromise])
  .then((result) => {
    return result;
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

exports.report = (review_id) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE reviews
    SET reported = NOT reported
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

exports.meta = async (query) => {

  let ratings = {};
  let characteristics = {};
  try {
      ratings = await db.query(`SELECT rating, recommend FROM reviews
      WHERE product_id=${query.product_id} AND reported=false`
      )
      //console.log(ratings.rows);
      characteristics = await db.query(`SELECT name_actual, characteristic_id, value FROM combined
      WHERE product_id=${query.product_id}`
      )
      //console.log(characteristics.rows);
      return [ratings.rows, characteristics.rows]
  } catch(error) {
    console.log('this is a meta error: ', error);
    return error;
  }


};