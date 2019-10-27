const { NotFound } = require('http-errors');
const Comment = require('./model')();

async function findAll(req, res) {
  const comments = await Comment.accessibleBy(req.ability);

  res.send({ comments });
}

async function create(req, res) {
  const comment = new Comment({
    ...req.body.comment,
    post: req.params.postId
  });

  if (req.user._id) {
    comment.author = req.user._id;
  }

  req.ability.throwUnlessCan('create', comment);
  await comment.save();

  res.send({ comment });
}

async function update(req, res) {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    throw new NotFound('Comment not found');
  }

  comment.set(req.body.comment);
  req.ability.throwUnlessCan('update', comment);
  await comment.save();

  res.send({ comment });
}

async function destroy(req, res) {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    req.ability.throwUnlessCan('delete', comment);
    await comment.remove();
  }

  res.send({ comment });
}

module.exports = {
  create,
  update,
  destroy,
  findAll
};
