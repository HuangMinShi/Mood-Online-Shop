const passport = require('passport')

const authenticator = {
  authenticateCredentials: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/signin'
    })(req, res, next)
  }
}

module.exports = authenticator