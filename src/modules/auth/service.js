const mongoose = require('mongoose')
const { BadRequest, Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

function create(req, res, next) {
  const { email, password } = req.body.session || {}

  if (!email || !password) {
    throw new BadRequest('Please specify "email" and "password" fields is "session" object')
  }

  mongoose.model('User').findOne({ email })
    .then(user => {
      if (!user || !user.isValidPassword(password)) {
        throw new Unauthorized('Not authenticated')
      }

      const accessToken = jwt.sign({ id: user.id }, req.app.get('jwt.secret'), {
        issuer: req.app.get('jwt.issuer'),
        audience: req.app.get('jwt.audience')
      });
      res.send({ accessToken })
    })
    .catch(next)
}

module.exports = { create }
