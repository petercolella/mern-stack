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
  const promise = new mongoose.Promise();
  this.find({}, function(err, foundSymptoms) {
    if (err) {
      promise.reject(err);
    } else {
      promise.resolve(foundSymptoms);
    }
  });
  return promise;
};

mongoose.Model.updateBody = function(body, symptom) {
  const promise = new mongoose.Promise();
  this.findOneAndUpdate(
    { _id: body._id },
    { $push: { symptoms: symptom._id } },
    { multi: true },
    function(err, updatedBody) {
      if (err) {
        promise.reject(err);
      } else {
        promise.resolve(updatedBody);
      }
    }
  );
  return promise;
};

db.Symptom.deleteMany({})
  .then(() => db.Symptom.collection.insertMany(symptomSeed))
  .then(() => db.Body.deleteMany({}))
  .then(() => db.Body.collection.insertMany(bodySeed))
  .then(data => {
    return data.ops.forEach(body => {
      console.log('body', body);
      return db.Symptom.find({}, (err, foundSymptoms) => {
        if (err) {
          console.log('Find Symptom Err: ', err);
          process.exit(1);
        }
        return foundSymptoms.forEach(symptom => {
          console.log('symptom', symptom);
          return db.Body.findOneAndUpdate(
            { _id: body._id },
            { $push: { symptoms: symptom._id } },
            { multi: true },
            (err, updatedBody) => {
              if (err) {
                console.log('Update Body Err: ', err);
                process.exit(1);
              }
            }
          );
        });
      });
    });
  });
