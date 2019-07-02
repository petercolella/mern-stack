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

mongoose.Model.findSymptoms = function() {
  let promise = new Promise((resolve, reject) => {
    this.find({}, function(err, foundSymptoms) {
      if (err) {
        reject(err);
      } else {
        resolve(foundSymptoms);
      }
    });
  });
  return promise;
};

mongoose.Model.updateBody = function(body, symptom) {
  let promise = new Promise((resolve, reject) => {
    this.findOneAndUpdate(
      { _id: body._id },
      { $push: { symptoms: symptom._id } },
      { multi: true },
      function(err, updatedBody) {
        if (err) {
          reject(err);
        } else {
          resolve(updatedBody);
        }
      }
    );
  });
  return promise;
};

db.Symptom.deleteMany({})
  .then(() => db.Symptom.collection.insertMany(symptomSeed))
  .then(() => db.Body.deleteMany({}))
  .then(() => db.Body.collection.insertMany(bodySeed))
  .then(data => {
    data.ops.forEach(body => {
      console.log('body', body);
      return db.Symptom.findSymptoms().then(foundSymptoms => {
        foundSymptoms.forEach(symptom => {
          console.log('symptom', symptom);
          return db.Body.updateBody(body, symptom)
            .then(() => process.exit(0))
            .catch(err => {
              console.log('Error: ', err.message);
              process.exit(1);
            });
        });
      });
    });
  });
