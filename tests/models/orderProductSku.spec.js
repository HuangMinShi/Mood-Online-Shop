process.env.NODE_ENV = 'test'

const {
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { OrderProductSku } = require('../../models')
const OrderProductSkuModel = require('../../models/orderProductSku')

const name = 'OrderProductSku'
const properties = [
  'quantity',
  'OrderId',
  'ProductSkuId'
]

describe('# OrderProductSku Model', () => {
  compareModelName(OrderProductSkuModel, name)
  checkModelProperties(OrderProductSkuModel, properties)
  checkModelCRUD(OrderProductSku)
})