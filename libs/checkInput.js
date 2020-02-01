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

  isQuantityInTheScope: (quantity) => {
    quantity = Number(quantity)

    if (
      isNaN(quantity)
      || (quantity < 1 || quantity > 3)
    ) {
      return false
    }

    return true
  },

  getCheckOption: (routePath) => {
    if (routePath === '/users/signup') return checkOptions.signUp
    if (routePath === '/users/signin') return checkOptions.signIn
    if (routePath === '/cart') return checkOptions.cart
    if (routePath === '/orders/checkout/shipping') return checkOptions.checkoutShipping
  },

  getErrorMessage: (key, input) => {
    input = input || ''
    const messages = {
      hasEmptyFields: `${input} 是必填欄位，請確認`,
      isEmailValid: 'email 無效，請重新輸入',
      isPasswordCheckCorrect: '兩次密碼不一致，請重新輸入',
      isQuantityInTheScope: '單次單項購買數量最少 1 件，最多 3 件，請確認',
      isPhoneNumsValid: '手機號碼格式錯誤，請確認'
    }
    return {
      message: messages[key]
    }
  },

  isPhoneNumsValid: (phone) => {
    phone = phone.replace(/[^\d]+/g, '')
    const pattern = /^09\d{8}$/
    return pattern.test(phone)
  }
}

/** 
 * 不同路由配置 
 * */
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
  },

  signIn: {
    requiredFields: ['email', 'password'],
    checkItems: {
      email: checkInput.isEmailValid
    },
    checkItemRequiredParams: {
      isEmailValid: ['email']
    }
  },

  cart: {
    requiredFields: ['productSn', 'color', 'size', 'quantity'],
    checkItems: {
      quantity: checkInput.isQuantityInTheScope
    },
    checkItemRequiredParams: {
      isQuantityInTheScope: ['quantity']
    }
  },

  checkoutShipping: {
    requiredFields: ['email', 'name', 'country', 'county', 'township', 'street', 'postal', 'phone', 'shipping'],
    checkItems: {
      email: checkInput.isEmailValid,
      phone: checkInput.isPhoneNumsValid
    },
    checkItemRequiredParams: {
      isEmailValid: ['email'],
      isPhoneNumsValid: ['phone']
    }
  }
}

module.exports = checkInput