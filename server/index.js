var express = require('express');
require('dotenv').config({path: '../.env'});
const PORT = process.env.port || 3000;
const reviews = require('../routes/reviews')

var app = express();

app.use('/reviews', reviews);

app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
});

module.exports = app;