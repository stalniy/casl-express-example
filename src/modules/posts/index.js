const posts = require('./service');

module.exports = {
  configure(app) {
    app.get('/articles', posts.findAll);
    app.post('/articles', posts.create);

    app.get('/articles/:id', posts.find);
    app.patch('/articles/:id', posts.update);
    app.delete('/articles/:id', posts.destroy);
  }
};
