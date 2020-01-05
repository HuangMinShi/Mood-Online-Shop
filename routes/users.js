const express = require('express')
const router = express.Router()

const {
  vaildateInput
} = require('../middlewares/validator')

const userController = require('../controllers/userController')

router.get('/signup', userController.signUpPage)

router.post('/signup',
  vaildateInput,
  userController.signUp
)

router.get('/signin', userController.signInPage)
router.post('/signin', userController.signIn)
router.get('/signout', userController.signOut)
router.get('*', (req, res) => res.render('404'))

router.get('/signout',
  userController.signOut
)

module.exports = router