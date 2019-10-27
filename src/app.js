const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { accessibleRecordsPlugin } = require('@casl/mongoose');
const errorHandler = require('./error-handler');

const MODULES = ['auth', 'comments', 'posts', 'users'];

module.exports = function createApp() {
  const app = express();

  mongoose.plugin(accessibleRecordsPlugin);
  app.use(bodyParser.json());

  MODULES.forEach((moduleName) => {
    const appModule = require(`./modules/${moduleName}`); // eslint-disable-line

    if (typeof appModule.configure === 'function') {
      appModule.configure(app);
    }
  });

  app.use(errorHandler);

  mongoose.Promise = global.Promise;
  return mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => app);
};
