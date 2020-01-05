const checkInput = {
  trimInputValues: (inputs) => {
    for (let key in inputs) {
      inputs[key] = inputs[key].trim()
    }
    return inputs
  },

  isEmailValid: (email) => {
    const maxEmailLength = 254
    const pattern = /^\w+([.-]?\w)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!pattern.test(email) || email.length > maxEmailLength) return false
    return true
  },

  isPasswordCheckCorrect: (password, passwordCheck) => {
    return password === passwordCheck ? true : false
  },

  getEmptyFields: (inputs, requiredFields) => {
    return requiredFields.filter(field => inputs[field].length === 0)
  },

  getCheckOption: (routePath) => {
    if (routePath === '/signup') {
      return checkOptions.signUp
    }
  },

  getErrorMessage: (key, input) => {
    input = input || ''
    const messages = {
      hasEmptyFields: `${input} 是必填欄位，請確認`,
      isEmailValid: 'email 無效，請重新輸入',
      isPasswordCheckCorrect: '兩次密碼不一致，請重新輸入'
    }
    return {
      message: messages[key]
    }
  },

}

const checkOptions = {
  signUp: {
    requiredFields: ['name', 'email', 'password', 'passwordCheck'],
    checkItems: {
      email: checkInput.isEmailValid,
      passwordCheck: checkInput.isPasswordCheckCorrect
    },
    checkItemRequiredParams: {
      isEmailValid: ['email'],
      isPasswordCheckCorrect: ['password', 'passwordCheck']
    }
  }
}

module.exports = checkInput