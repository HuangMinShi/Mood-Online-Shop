const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const {
  User
} = require('../models')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ where: { email: email } })

      if (!user) {
        return done(null, false, req.flash('errorMessage', '信箱尚未註冊'))
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, req.flash('errorMessage', '信箱或密碼錯誤'))
      }

      return done(null, user, req.flash('successMessage', '登入成功'))
    } catch (err) {
      console.log(err);
    }
  })
)

// 序列化 & 反序列化
passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    return done(null, user)
  } catch (err) {
    console.log(err);
  }
})

module.exports = passport