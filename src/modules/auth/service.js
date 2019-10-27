const mongoose = require('mongoose');
const { BadRequest, Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

async function create(req, res) {
  const { email, password } = req.body.session || {};

  if (!email || !password) {
    throw new BadRequest('Please specify "email" and "password" fields is "session" object');
  }

  const user = await mongoose.model('User').findOne({ email });

  if (!user || !user.isValidPassword(password)) {
    throw new Unauthorized('Not authenticated');
  }

  const accessToken = jwt.sign({ id: user.id }, req.app.get('jwt.secret'), {
    issuer: req.app.get('jwt.issuer'),
    audience: req.app.get('jwt.audience')
  });

  res.send({ accessToken });
}

module.exports = { create };
