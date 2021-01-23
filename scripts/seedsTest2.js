const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demoDB', {
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.set('useCreateIndex', true);

const bodySeed = [
  {
    name: 'Head',
    symptoms: []
  },
  {
    name: 'Torso',
    symptoms: []
  }
];

const symptomSeed = [
  {
    name: 'Pain'
  },
  {
    name: 'Swelling'
  }
];

db.Symptom.deleteMany({})
  .then(() => db.Symptom.collection.insertMany(symptomSeed))
  .then(() => db.Body.deleteMany({}))
  .then(() => db.Body.collection.insertMany(bodySeed))
  .then(data => {
    data.ops.map(body => {
      db.Symptom.find().then(foundSymptoms => {
        foundSymptoms.map(symptom => {
          db.Body.findOneAndUpdate(
            { _id: body._id },
            { $push: { symptoms: symptom._id } },
            { new: true }
          )
            .then(updatedBody => {
              console.log('updatedBody', updatedBody);
              //   process.exit(0);
            })
            .catch(err => {
              console.log('Error: ', err.message);
              process.exit(1);
            });
        });
      });
    });
  });
