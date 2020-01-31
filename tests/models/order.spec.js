process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { Order } = require('../../models')
const OrderModel = require('../../models/order')

const name = 'Order'
const properties = [
  'sn',
  'status',
  'total',
  'invoice',
  'note',
  'receiveName',
  'receiveAddress',
  'receiveCountry',
  'receivePhone',
  'shippingMethod',
  'UserId'
]
const associations = [
  ['belongsToMany', 'ProductSku'],
  ['belongsTo', 'User'],
  ['hasMany', 'PaymentLog']
]

describe('# Order Model', () => {
  compareModelName(OrderModel, name)
  checkModelProperties(OrderModel, properties)
  checkModelAssociations(OrderModel, associations)
  checkModelCRUD(Order)
})