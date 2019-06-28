const mongoose = require('mongoose');
const db = require('../models');

// This file empties the users collection and the nudge collection and inserts the respective info below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demoDB', {
  useNewUrlParser: true
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
      body.symptoms.forEach((symptom, i) => {
        db.Symptom.findOne({ name: symptom.name }, (err, foundSymptom) => {
          if (err) {
            console.log('Find Symptom Err: ', err);
            process.exit(1);
          }
          body.symptoms.push(foundSymptom);
          console.log('body', body);
        });
      });
      body.save((err, savedBody) => console.log(savedBody));
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// db.Body.deleteMany({})
//   .then(() => db.Body.collection.insertMany(bodySeed))
//   .then(data => {
//     console.log(data.result.n + ' records inserted!');
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// db.Symptom.deleteMany({}).then(() => {
//   db.Symptom.insertMany(symptomSeed, (err, symptoms) => {
//     if (err) {
//       console.log('DB Sympton Creation Err: ', err);
//       process.exit(1);
//     }

//     db.Body.deleteMany({}).then(() => {
//       bodySeed.forEach(bodyData => {
//         let body = new db.Body({
//           name: bodyData.name,
//           symptoms: []
//         });
//         console.log('new body', body);

//         bodyData.symptoms.forEach(symptomData => {
//           db.Symptom.findOne(
//             { name: symptomData.name },
//             (err, foundSymptom) => {
//               if (err) {
//                 console.log('Find Symptom Err: ', err);
//                 process.exit(1);
//               }

//               body.symptoms.push(foundSymptom);
//             }
//           );
//         });
//         body.save((err, savedBody) => {
//           if (err) {
//             console.log('Save Body Err: ', err);
//             process.exit(1);
//           }
//           console.log('body post push: ', body);
//           console.log('savedBody', savedBody);
//         });
//       });
//     });
//   });
// });
