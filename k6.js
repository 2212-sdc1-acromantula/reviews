import http from 'k6/http';
import { sleep } from 'k6';

//USE k6 run k6.js to run tests

// export default function () {
//   http.get('http://localhost:3000/reviews?product_id=981225&page=0&sort=date&count=10');
//   sleep(1);
// }

// export default function () {
//   http.get('http://localhost:3000/reviews/meta?product_id=1');
//   sleep(1);
// }

// export default function () {
//   http.put('http://localhost:3000/reviews/1/helpful');
//   sleep(1);
// }

// export default function () {
//   http.put('http://localhost:3000/reviews/2/report');
//   sleep(1);
// }

// export default function () {
//   http.post('http://localhost:3000/reviews', JSON.stringify({
//     "product_id": 1,
//     "rating": 1,
//     "summary": "a second another review",
//     "body": "this is the body",
//     "recommend": true,
//     "name": "username1234",
//     "email": "username1234@gmail.com",
//     "photos": ["url1","url2","url3"],
//     "characteristics": {"1": 2, "2": 3,"3": 4, "4":1}
//   }),{
//     headers: { 'Content-Type': 'application/json' },
//   });
//   sleep(1);
// }

//Initial values:
// get reviews: 5.58s
// post reviews: 3.68s
// get meta: 7.17s
// put helpful: 11.75ms
// put report: 10.28ms

//After indexing values:
// get reviews: 25.81ms
// post reviews: 49.44ms
// get meta: 30.95ms
// put helpful: 16.42ms
// put report: 12.05ms


