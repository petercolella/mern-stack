const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const symptomSchema = new Schema({
  name: { type: String }
});

const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;
