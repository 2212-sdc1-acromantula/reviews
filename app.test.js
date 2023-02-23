const request = require("supertest");
require('dotenv').config({path: '.env'});
const app = require("./server/index.js");

jest.setTimeout(10 * 1000);

it('should make a GET request to /reviews', async () => {
  expect.assertions(2);
  const data = await request(app)
  .get("/reviews?product_id=2&page=0&sort=date&count=10");

  expect(Array.isArray(JSON.parse(data.text))).toBe(true);
  expect(data.statusCode).toBe(200);
});

it('should make a GET request to /reviews/meta', async () => {
  expect.assertions(2);
  const data = await request(app)
  .get("/reviews/meta?product_id=2");

  expect(typeof JSON.parse(data.text)).toBe('object');
  expect(data.statusCode).toBe(200);
});

it('should make a POST request to /reviews', async () => {
  expect.assertions(1);
  const data = await request(app)
  .post("/reviews")
  .send({
    "product_id": 1,
    "rating": 1,
    "summary": "another review",
    "body": "body body body",
    "recommend": true,
    "name": "username1234",
    "email": "username1234@gmail.com",
    "photos": ["url1","url2","url3"],
    "characteristics": {"1": 2, "2": 3,"3": 4, "4":1}
  })

  expect(data.statusCode).toBe(201);
});

it('should make a PUT request to /reviews/:review_id/helpful', async () => {
  expect.assertions(1);
  const data = await request(app)
  .put("/reviews/1/helpful");

  expect(data.statusCode).toBe(204);
});

it('should make a PUT request to /reviews/:review_id/report', async () => {
  expect.assertions(1);
  const data = await request(app)
  .put("/reviews/2/report");

  expect(data.statusCode).toBe(204);
});