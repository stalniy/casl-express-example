const { NotFound } = require('http-errors')
const Comment = require('./model')()

function findAll(req, res, next) {
  Comment.accessibleBy(req.ability)
    .then(comments => res.send({ comments }))
    .catch(next)
}

function create(req, res, next) {
  const comment = new Comment(Object.assign({}, req.body.comment, {
    post: req.params.postId
  }))

  if (req.user._id) {
    comment.author = req.user._id
  }

  req.ability.throwUnlessCan('create', comment)
  comment.save().catch(next).then(() => res.send({ comment }))
}

function update(req, res, next) {
  Comment.findOne({ _id: req.params.id })
    .then(comment => {
      if (!comment) {
        throw new NotFound('Comment not found')
      }

      comment.set(req.body.comment)
      req.ability.throwUnlessCan('update', comment)

      return comment.save().then(() => comment)
    })
    .then(comment => res.send({ comment }))
    .catch(next)
}

function destroy(req, res, next) {
  Comment.findOne({ _id: req.params.id })
    .then(comment => {
      if (comment) {
        req.ability.throwUnlessCan('delete', comment)
        return comment.remove().then(() => comment)
      }
    })
    .then(comment => res.send({ comment }))
    .catch(next)
}

module.exports = { create, update, destroy, findAll }
