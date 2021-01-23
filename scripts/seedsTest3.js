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

let bodyIds;
let symptomIds;

function updateBody(bodyIds, symptomIds) {
  const updatePromises = bodyIds.map(bodyId => {
    return symptomIds.map(symptomId => {
      return db.Body.findOneAndUpdate(
        { _id: bodyId },
        { $push: { symptoms: symptomId } },
        { new: true }
      )
        .then(result => {
          return result;
        })
        .catch(err => {
          console.log('Error: ', err.message);
          process.exit(1);
        });
    });
  });
  Promise.all(updatePromises).then(outerArr => {
    console.log('outerArr', outerArr, '\n');
    const newPromiseArr = [];
    outerArr.forEach(innerArr => {
      console.log('innerArr', innerArr, '\n');
      innerArr.forEach(promise => {
        console.log('promise', promise, '\n');
        newPromiseArr.push(promise);
        console.log('newPromiseArr', newPromiseArr, '\n');
      });
    });
    Promise.all(newPromiseArr).then(results => {
      console.log('results:', results, '\n');
      process.exit(0);
    });
  });
}

db.Body.deleteMany({})
  .then(() => db.Body.collection.insertMany(bodySeed))
  .then(data => {
    const bodyPromises = data.ops.map(body => {
      return body._id;
    });
    Promise.all(bodyPromises)
      .then(ids => {
        bodyIds = ids;
      })
      .then(() => {
        db.Symptom.deleteMany({})
          .then(() => db.Symptom.collection.insertMany(symptomSeed))
          .then(data => {
            const symptomPromises = data.ops.map(symptom => {
              return symptom._id;
            });
            Promise.all(symptomPromises)
              .then(ids => {
                symptomIds = ids;
              })
              .then(() => {
                updateBody(bodyIds, symptomIds);
              });
          });
      });
  });
