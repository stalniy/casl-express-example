const comments = require('./service');

module.exports = {
  configure(app, router) {
    router.get('/posts/:postId/comments', comments.findAll);
    router.post('/posts/:postId/comments', comments.create);

    router.patch('/posts/:postId/comments/:id', comments.update);
    router.delete('/posts/:postId/comments/:id', comments.destroy);
  }
};
