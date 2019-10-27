const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = function () {
  const Post = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  }, {
    timestamps: true
  });

  return mongoose.model('Post', Post);
};
