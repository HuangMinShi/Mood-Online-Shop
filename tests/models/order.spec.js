process.env.NODE_ENV = 'test'

const { Order } = require('../../models')
const OrderModel = require('../../models/order')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'sn',
  'status',
  'amount',
  'order_name',
  'order_address',
  'order_email',
  'order_phone',
  'invoice',
  'note',
  'receive_name',
  'receive_address',
  'receive_email',
  'receive_phone',
  'userId',
  'shipping_methodId'
]
const associations = [
  ['belongsToMany', 'Product_sku'],
  ['belongsTo', 'User'],
  ['hasMany', 'Payment_log'],
  ['belongsTo', 'Shipping_method']
]

describe('# Order Model', () => {
  compareModelName(OrderModel, 'Order')
  checkModelProperties(OrderModel, properties)
  checkModelAssociations(OrderModel, associations)
  checkModelCRUD(Order)
})