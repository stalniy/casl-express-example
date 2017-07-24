const { NotFound } = require('http-errors')
const User = require('./model')()

function find(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        throw new NotFound('User is not found')
      }

      req.ability.throwUnlessCan('read', user)
      res.send({ user })
    })
    .catch(next)
}

function update(req, res, next) {
  User.findOne({ _id: req.params.id })
    .then(user => {
      if (!user) {
        throw new NotFound('Comment not found')
      }

      user.set(req.body.user)
      req.ability.throwUnlessCan('update', user)

      return user.save().then(() => user)
    })
    .then(user => res.send({ user }))
    .catch(next)
}

function create(req, res) {
  const user = new User(req.body.user)

  req.ability.throwUnlessCan('create', user)
  res.send({ user })
}

module.exports = { create, find, update }
