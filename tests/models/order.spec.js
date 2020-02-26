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
  'totalAmount',
  'payment',
  'receipt',
  'note',
  'receiveName',
  'receiveAddress',
  'receiveCountry',
  'receivePhone',
  'shippingWay',
  'orderEmail',
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