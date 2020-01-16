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
      || (quantity < 1 || quantity > 10)
    ) {
      return false
    }

    return true
  },

  getCheckOption: (routePath) => {
    if (routePath === '/users/signup') return checkOptions.signUp
    if (routePath === '/users/signin') return checkOptions.signIn
    if (routePath === '/cart') return checkOptions.cart
  },

  getErrorMessage: (key, input) => {
    input = input || ''
    const messages = {
      hasEmptyFields: `${input} 是必填欄位，請確認`,
      isEmailValid: 'email 無效，請重新輸入',
      isPasswordCheckCorrect: '兩次密碼不一致，請重新輸入',
      isQuantityInTheScope: '商品數量超過可銷售範圍，請確認'
    }
    return {
      message: messages[key]
    }
  },

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
  }
}

module.exports = checkInput