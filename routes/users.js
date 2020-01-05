const express = require('express')
const router = express.Router()

const { vaildateInput } = require('../middlewares/validator')
const { authenticateCredentials } = require('../middlewares/authenticator')

const userController = require('../controllers/userController')

/* ======== routes ========== */

router.get('/signup',
  userController.signUpPage
)

router.post('/signup',
  vaildateInput,
  userController.signUp
)

router.get('/signin',
  userController.signInPage
)

router.post('/signin',
  vaildateInput,
  authenticateCredentials
)

router.get('/signout',
  userController.signOut
)

module.exports = router