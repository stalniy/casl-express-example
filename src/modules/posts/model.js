const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = function () {
  const Article = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  }, {
    timestamps: true
  });

  return mongoose.model('Article', Article);
};
