const createApp = require('./app');

createApp()
  .then((app) => {
    app.listen(3030);
    console.log('API is listening on http://localhost:3030');
  });
