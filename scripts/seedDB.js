const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/demoDB',
  { useNewUrlParser: true }
);

const userSeed = {
  name: 'Fist Last',
  email: 'me@me.com',
  password: 'password',
  date: new Date(Date.now())
};

db.User.deleteMany({})
  .then(() => db.User.collection.insertOne(userSeed))
  .then(data => {
    console.log(`${data.result.n} record(s) inserted.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
