const { NotFound } = require('http-errors')
const Post = require('./model')()

function findAll(req, res, next) {
  Post.accessibleBy(req.ability)
    .then(posts => {
      res.send({ posts })
    })
    .catch(next)
}

function find(req, res, next) {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        throw new NotFound('Post not found')
      }

      req.ability.throwUnlessCan('update', post)
      res.send({ post })
    })
    .catch(next)
}

function create(req, res, next) {
  const post = new Post(Object.assign({}, req.body.post, {
    author: req.user._id
  }))


  req.ability.throwUnlessCan('create', post)
  post.save().catch(next).then(() => res.send({ post }))
}

function update(req, res, next) {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        throw new NotFound('Post not found')
      }

      post.set(req.body.post)
      req.ability.throwUnlessCan('update', post)

      return post.save().then(() => post)
    })
    .then(post => res.send({ post }))
    .catch(next)
}

function destroy(req, res, next) {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (post) {
        req.ability.throwUnlessCan('delete', post)
        return post.remove().then(() => post)
      }
    })
    .then(post => res.send({ post }))
    .catch(next)
}

module.exports = { create, update, destroy, find, findAll }
