const users = require('./service');

module.exports = {
  configure(app) {
    app.get('/users/:id', users.find);
    app.patch('/users/:id', users.update);
    app.post('/users', users.create);
  }
};
