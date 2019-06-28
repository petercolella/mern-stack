const db = require('../models');

module.exports = {
  hello: function(req, res) {
    res.json('Hello World!');
  },
  getBodies: function(req, res) {
    db.Body.find()
      .populate('symptoms')
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
