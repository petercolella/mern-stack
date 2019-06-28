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
    symptoms: [
      {
        name: 'Pain'
      },
      {
        name: 'Swelling'
      }
    ]
  },
  {
    name: 'Torso',
    symptoms: [
      {
        name: 'Pain'
      },
      {
        name: 'Swelling'
      }
    ]
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
    data.ops.forEach(body => {
      const symptomsArr = [];
      body.symptoms.forEach(symptom => {
        db.Symptom.findOne({ name: symptom.name }, (err, foundSymptom) => {
          if (err) {
            console.log('Find Symptom Err: ', err);
            process.exit(1);
          }
          symptomsArr.push(foundSymptom._id);
        }).then(() => {
          db.Body.findOneAndUpdate(
            { _id: body._id },
            { $set: { symptoms: symptomsArr } },
            { multi: true }
          ).then(result => console.log('result', result));
        });
      });
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
