const { NotFound } = require('http-errors');
const User = require('./model')();

async function find(req, res) {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFound('User is not found');
  }

  req.ability.throwUnlessCan('read', user);
  res.send({ user });
}

async function update(req, res) {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFound('User is not found');
  }

  user.set(req.body.user);
  req.ability.throwUnlessCan('update', user);
  await user.save();

  res.send({ user });
}

async function create(req, res) {
  const user = new User(req.body.user);

  req.ability.throwUnlessCan('create', user);
  await user.save();

  res.status(201).send({ user });
}

module.exports = {
  create,
  find,
  update
};
