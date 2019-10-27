const { NotFound } = require('http-errors');
const Article = require('./model')();
const { parsePagination } = require('../utils');

async function findAll(req, res) {
  const articlesQuery = Article.accessibleBy(req.ability);
  const [page, pageSize] = parsePagination(req.query);
  const countQuery = Article.find().merge(articlesQuery);

  const [items, count] = await Promise.all([
    articlesQuery.limit(pageSize).skip((page - 1) * pageSize),
    countQuery.count()
  ]);

  res.send({ items, count });
}

async function find(req, res) {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new NotFound('article not found');
  }

  req.ability.throwUnlessCan('read', article);
  res.send({ item: article });
}

async function create(req, res) {
  const article = new Article({
    ...req.body,
    author: req.user._id
  });

  req.ability.throwUnlessCan('create', article);
  await article.save();
  res.send({ item: article });
}

async function update(req, res) {
  const article = await Article.findById(req.params.id);

  if (!article) {
    throw new NotFound('article not found');
  }

  article.set(req.body);
  req.ability.throwUnlessCan('update', article);
  await article.save();

  res.send({ item: article });
}

async function destroy(req, res) {
  const article = await Article.findById(req.params.id);

  if (article) {
    req.ability.throwUnlessCan('delete', article);
    await article.remove();
  }

  res.send({ item: article });
}

module.exports = {
  create,
  update,
  destroy,
  find,
  findAll
};
