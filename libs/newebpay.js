const crypto = require('crypto')

const host = process.env.HOST_URL
const hashKey = process.env.HASH_KEY
const hashIv = process.env.HASH_IV
const merchantID = process.env.MERCHANT_ID
const payGateWay = 'https://ccore.spgateway.com/MPG/mpg_gateway'
const returnURL = host + '/orders/newebpay/callback?from=ReturnURL'
const notifyURL = host + '/orders/newebpay/callback?from=NotifyURL'
const clientBackURL = host + '/orders'

const encodeToUrlQueryString = params => {
  const keyValuePairs = Object.entries(params)
  const result = keyValuePairs.map(pair => `${pair[0]}=${pair[1]}`).join('&')

  return result
}

const encrypt = tradeData => {
  const cipher = crypto.createCipheriv('aes256', hashKey, hashIv)

  let encrypted = cipher.update(tradeData, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}

const decrypt = tradeInfo => {
  const decipher = crypto.createDecipheriv('aes256', hashKey, hashIv)

  // 從 newebpay 傳進來的加密資料沒有使用標準密碼區塊填充，因此關閉自動填充
  decipher.setAutoPadding(false)
  let text = decipher.update(tradeInfo, 'hex', 'utf8')
  text += decipher.final('utf8')
  const plainText = text.replace(/[\x00-\x20]+/g, '')

  return plainText
}

const genHash = (encryptedData, hashKey, hashIv) => {
  const hash = crypto.createHash('sha256')

  const data = `HashKey=${hashKey}&${encryptedData}&HashIV=${hashIv}`
  const result = hash.update(data).digest('hex').toUpperCase()

  return result
}

const genTradeInfo = (order) => {
  const { sn, totalAmount, note, orderEmail } = order

  const tradeParams = {
    MerchantID: merchantID,
    RespondType: 'JSON',
    TimeStamp: Date.now(),
    MerchantOrderNo: sn,
    Version: 1.5,
    LoginType: 0,
    Amt: totalAmount,
    Email: orderEmail,
    ItemDesc: note || '',
    OrderComment: note || '',
    ReturnURL: returnURL,
    NotifyURL: notifyURL,
    ClientBackURL: clientBackURL
  }

  const tradeParamsEncoded = encodeToUrlQueryString(tradeParams)
  const tradeEncrypted = encrypt(tradeParamsEncoded)
  const tradeHash = genHash(tradeEncrypted, hashKey, hashIv)

  const tradeInfo = {
    MerchantID: tradeParams.MerchantID,
    TradeInfo: tradeEncrypted,
    TradeSha: tradeHash,
    Version: tradeParams.Version,
    MerchantOrderNo: tradeParams.MerchantOrderNo,
    PayGateWay: payGateWay
  }

  return tradeInfo
}




module.exports = {
  decrypt,
  genTradeInfo
}