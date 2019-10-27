const comments = require('./service');

module.exports = {
  configure(app) {
    app.get('/posts/:postId/comments', comments.findAll);
    app.post('/posts/:postId/comments', comments.create);

    app.patch('/posts/:postId/comments/:id', comments.update);
    app.delete('/posts/:postId/comments/:id', comments.destroy);
  }
};
