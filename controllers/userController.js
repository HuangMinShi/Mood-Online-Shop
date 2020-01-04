const bcrypt = require('bcryptjs')
const {
  User
} = require('../models')

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: async (req, res) => {
    const inputs = { ...req.body }

    // 重複註冊 ?
    const user = await User.findOne({
      where: {
        email: inputs.email
      }
    })

    if (user) {
      req.flash('errorMessage', 'Email 已註冊')
      return res.redirect('back')
    }

    // password 加鹽存入資料庫
    const salt = await bcrypt.genSalt(10)
    const passwordInHash = await bcrypt.hash(inputs.password, salt)
    await User.create({
      ...inputs,
      password: passwordInHash
    })

    return res.redirect('signIn')
  },

  signInPage: (req, res) => {
    return res.send('signInPage')
  },

  signIn: (req, res) => {
    return res.send('signIn')
  },

  signOut: (req, res) => {
    return res.send('signOut')
  },
}

module.exports = userController