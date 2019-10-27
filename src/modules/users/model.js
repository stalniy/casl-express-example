const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = function () {
  const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }, {
    timestamps: true
  });

  User.method('isValidPassword', function isValidPassword(password) {
    return password === this.password;
  });

  return mongoose.model('User', User);
};
