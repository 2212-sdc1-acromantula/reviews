-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'reviews'
--
-- ---

--DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE IF NOT EXISTS reviews (
  review_id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NULL DEFAULT NULL,
  summary VARCHAR NULL DEFAULT NULL,
  recommend BOOLEAN NULL DEFAULT NULL,
  response VARCHAR NULL DEFAULT NULL,
  body VARCHAR(1000) NULL DEFAULT NULL,
  date VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT 0,
  reported BOOLEAN NULL DEFAULT FALSE,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  reviewer_email VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (review_id)
);


-- ---
-- Table 'photos'
--
-- ---

--DROP TABLE IF EXISTS photos;

CREATE TABLE IF NOT EXISTS photos (
  id INTEGER NULL DEFAULT NULL,
  review_id_reviews INTEGER NULL DEFAULT NULL,
  url VARCHAR(2048) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'characteristics'
--
-- ---

--DROP TABLE IF EXISTS characteristics;

CREATE TABLE IF NOT EXISTS characteristics (
  id INTEGER NULL DEFAULT NULL,
  characteristic_id INTEGER NULL DEFAULT NULL,
  review_id_reviews INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  value INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

--DROP TABLE IF EXISTS characteristic_values;

CREATE TABLE IF NOT EXISTS characteristic_values (
  id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  name_actual VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

--DROP TABLE IF EXISTS combined;

CREATE TABLE IF NOT EXISTS combined AS SELECT characteristics.id, characteristics.characteristic_id, characteristics.review_id_reviews, characteristic_values.product_id, characteristic_values.name_actual, characteristics.value
FROM characteristics
INNER JOIN characteristic_values
ON characteristics.characteristic_id = characteristic_values.id;

DROP TABLE IF EXISTS combined_photos;

CREATE TABLE IF NOT EXISTS combined_photos AS SELECT photos.id, photos.review_id_reviews, photos.url, reviews.product_id
FROM reviews
INNER JOIN photos
ON reviews.review_id = photos.review_id_reviews;



-- ---
-- Foreign Keys
-- ---

ALTER TABLE photos ADD FOREIGN KEY (review_id_reviews) REFERENCES reviews (review_id);
ALTER TABLE characteristics ADD FOREIGN KEY (review_id_reviews) REFERENCES reviews (review_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `reviews` (`review_id`,`product_id`,`rating`,`summary`,`recommend`,`response`,`body`,`date`,`helpfulness`,`reported`,`reviewer_name_users`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `photos` (`id`,`review_id_reviews`,`url`) VALUES
-- ('','','');
-- INSERT INTO `characteristics` (`id`,`characteristic_id`,`review_id_reviews`,`name`,`value`) VALUES
-- ('','','','','');