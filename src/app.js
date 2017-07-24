const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { mongoosePlugin: abilitiesPlugin } = require('casl')
const errorHandler = require('./error-handler')
const MODULES = ['auth', 'comments', 'posts', 'users']

module.exports = function createApp() {
  const app = express()
  const router = express.Router()

  mongoose.plugin(abilitiesPlugin)
  app.use(bodyParser.json())

  MODULES.forEach(moduleName => {
    const module = require(`./modules/${moduleName}`)

    if (typeof module.configure === 'function') {
      module.configure(app)
    }
  })

  app.use(errorHandler)

  mongoose.Promise = global.Promise
  return mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => app)
}
