const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  phone: { type: String },
  date: { type: Date, default: Date.now },
  choices: { type: Array }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
