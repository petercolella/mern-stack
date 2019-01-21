const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demoDB');

app.listen(PORT, function() {
  console.log(`Listening on PORT: ${PORT}`);
});
