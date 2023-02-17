-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  review_id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NULL DEFAULT NULL,
  summary VARCHAR(60) NULL DEFAULT NULL,
  recommend BOOLEAN NULL DEFAULT NULL,
  response VARCHAR NULL DEFAULT NULL,
  body VARCHAR(1000) NULL DEFAULT NULL,
  date TIMESTAMP NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT 0,
  reported BOOLEAN NULL DEFAULT FALSE,
  reviewer_name_users VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (review_id)
);


-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER NULL DEFAULT NULL,
  review_id_reviews INTEGER NULL DEFAULT NULL,
  url VARCHAR(2048) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id INTEGER NULL DEFAULT NULL,
  characteristic_id INTEGER NULL DEFAULT NULL,
  review_id_reviews INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  value INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

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