const {
  getCheckOption,
  getEmptyFields,
  trimInputValues,
  getErrorMessage,
} = require('../libs/checkInput')

const vaildator = {
  vaildateInput: (req, res, next) => {
    const errors = []

    //  去除欄位多餘空白
    const inputs = trimInputValues(req.body)
    const {
      requiredFields,
      checkItems,
      checkItemRequiredParams
    } = getCheckOption(req.originalUrl)

    //  取得 user 未填欄位
    const emptyFields = getEmptyFields(inputs, requiredFields)

    //  若有必填欄位卻未輸入，加入錯誤訊息
    if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
        errors.push(getErrorMessage('hasEmptyFields', field.toLowerCase()))
      })
    }

    //  檢查個別欄位
    for (let key in checkItems) {
      const checkFunction = checkItems[key]
      const params = checkItemRequiredParams[checkFunction.name]
      const args = params.map(arg => inputs[arg])
      if (!checkFunction(...args)) {
        errors.push(getErrorMessage(`${checkFunction.name}`))
      }
    }

    if (errors.length > 0) {
      req.flash('errors', errors)
      return res.redirect('back')
    }

    next()
  }
}

module.exports = vaildator