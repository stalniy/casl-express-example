const passport = require('passport')
const { configurePassport } = require('./jwt')
const session = require('./service')
const createAbilities = require('./abilities')

module.exports = {
  configure(app) {
    app.post('/session', session.create)

    const secret = 'secret.casl.authorization'

    app.set('jwt.secret', secret)
    app.set('jwt.issuer', 'CASL.Express')
    app.set('jwt.audience', 'casl.com')
    configurePassport(passport, { secretOrKey: secret })
    app.use(passport.initialize())
    app.use(passport.authenticate('jwt', { session: false }), createAbilities)
  }
}
