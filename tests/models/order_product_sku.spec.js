process.env.NODE_ENV = 'test'

const { Order_product_sku } = require('../../models')
const OrderProductSkuModel = require('../../models/order_product_sku')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'quantity',
  'orderId',
  'product_skuId'
]

describe('# Order_product_sku Model', () => {
  compareModelName(OrderProductSkuModel, 'Order_product_sku')
  checkModelProperties(OrderProductSkuModel, properties)
  checkModelCRUD(Order_product_sku)
})