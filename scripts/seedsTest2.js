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
    const promises = data.ops.map(body => {
      return body;
      //   return db.Symptom.find().exec();
      // .then(foundSymptoms => {
      //   console.log('foundSystems', foundSymptoms);
      //   return foundSymptoms;
      // });
      //   .then(foundSymptoms => {
      //     return foundSymptoms.map(symptom => {
      //       return db.Body.findOneAndUpdate(
      //         { _id: body._id },
      //         { $push: { symptoms: symptom._id } },
      //         { new: true }
      //       )
      //         .exec()
      //         .then(updatedBody => {
      //           // console.log('updatedBody', updatedBody);
      //           return updatedBody;
      //         });
      //       //       .catch(err => {
      //       //         console.log('Error: ', err.message);
      //       //         process.exit(1);
      //       //       });
      //     });
      //   })
      // .catch(err => {
      //   console.log('Error: ', err.message);
      //   process.exit(1);
      // });
    });
    Promise.all(promises).then(res => {
      console.log('res', res);
      res.map(item => {
        console.log('item', item);
        // item.map(item2 => {
        //   console.log('item2', item2);
        //   //   item2.then(final => {
        //   //     console.log('final', final);
        //   //     return final;
        //   //   });
        // });
      });
      //   process.exit(0);
    });
    // console.log('promises', promises);
    // Promise.all(promises).then(promiseArr => {
    //   //   console.log('resArr', resArr);
    //   //   Promise.all(resArr).then(res => {
    //   //     console.log('res', res);
    //   //   });
    //   return promiseArr.map(res => {
    //     // console.log('res', res);
    //     return res.map(promise => {
    //       console.log('promise', promise);
    //       return promise
    //         .then(secRes => {
    //           console.log('2nd res', secRes);
    //           return secRes;
    //         })
    //         // .then(() => process.exit(0));
    //       //   process.exit(0);
    //     });
    //     // Promise.all(promisePromises).then(process.exit(0));
    //   });
    // });
  });
