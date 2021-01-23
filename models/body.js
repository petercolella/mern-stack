const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bodySchema = new Schema({
  name: { type: String },
  symptoms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Symptom'
    }
  ]
});

const Body = mongoose.model('Body', bodySchema);

module.exports = Body;
