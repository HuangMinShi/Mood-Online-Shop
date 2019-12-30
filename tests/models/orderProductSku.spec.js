process.env.NODE_ENV = 'test'

const { OrderProductSku } = require('../../models')
const OrderProductSkuModel = require('../../models/orderProductSku')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'quantity',
  'orderId',
  'productSkuId'
]

describe('# OrderProductSku Model', () => {
  compareModelName(OrderProductSkuModel, 'OrderProductSku')
  checkModelProperties(OrderProductSkuModel, properties)
  checkModelCRUD(OrderProductSku)
})