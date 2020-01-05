const bcrypt = require('bcryptjs')

const { User } = require('../models')

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: async (req, res) => {
    const inputs = { ...req.body }

    try {
      const user = await User.findOne({
        where: { email: inputs.email }
      })

      //  重複註冊 ?
      if (user) {
        req.flash('errorMessage', 'Email 已註冊')
        return res.redirect('back')
      }

      //  password 加鹽存入資料庫
      const salt = await bcrypt.genSalt(10)
      const passwordInHash = await bcrypt.hash(inputs.password, salt)
      await User.create({
        ...inputs,
        password: passwordInHash
      })

      return res.redirect('/users/signin')
    } catch (err) {
      console.log(err);
    }
  },

  signInPage: (req, res) => {
    return res.render('signIn')
  },

  signOut: (req, res) => {
    req.logout()
    req.flash('successMessage', '成功登出')
    return res.redirect('/users/signin')
  },
}

module.exports = userController