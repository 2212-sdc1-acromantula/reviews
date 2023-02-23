const fs = require('fs');
require('dotenv').config();
const { Pool, Client } = require('pg');


const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

//client.connect();

client.connect((err) => {
  if (err) throw err;
  console.log('Connected to Database');
});

//For reviews: start byte=108
// const textReviews = `INSERT INTO reviews (review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT DO NOTHING`;

//For photos: start byte=17
// const textReviewsPhotos = `INSERT INTO photos (id, review_id_reviews, url) VALUES($1, $2, $3) ON CONFLICT DO NOTHING`;

//For characteristic_reviews: start byte=17
// const textCharacteristicReviews = `INSERT INTO characteristics (id, characteristic_id, review_id_reviews, value) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING`;

//for characteristics: start byte=19 and update query value to [values[0], values[2]]
// const textCharacteristics = `INSERT INTO characteristic_values (id, product_id, name_actual) VALUES($1, $2, $3) ON CONFLICT DO NOTHING`;

async function insertChunks(readable, text) {
  let previous = '';
  let values = [];
  let counter = 1;
  let eolIndex = 0;
  let startSearch = 0;
  let tempArray = [];
  for await (const chunk of readable) {
    //console.log('chunk: ', chunk);
    startSearch = previous.length;
    previous += chunk;
    while (true) {
      eolIndex = previous.indexOf('\n', startSearch);
      if (eolIndex < 0) {
        eolIndex = null;
        break;
      }
      // line includes the EOL
      values = previous.slice(0, eolIndex).split(',');
      //console.log([values[0], values[2]]);
      await client
        .query(text, values)
        .catch(e => console.error(e.stack));
      values = null;
      console.log(counter);
      counter++;
      previous = previous.slice(eolIndex+1);
      startSearch = 0;
    }
  }
  if (previous.length > 0) {
    values = previous.split(',');
    client
    .query(text, values)
    .catch(e => console.error(e.stack));
  }
  console.log('finished adding files to db');
}

const readableReviews = fs.createReadStream(
  './data/characteristics.csv', {
      flag: 'a+',
      encoding: 'UTF-8',
      start: 19,
      highWaterMark: 128 * 1024
    });

insertChunks(readableReviews, textCharacteristics);

