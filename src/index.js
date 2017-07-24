const createApp = require('./app')

createApp()
  .then(app => app.listen(3030))
