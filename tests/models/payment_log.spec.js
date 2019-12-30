process.env.NODE_ENV = 'test'

const { Payment_log } = require('../../models')
const Payment_logModel = require('../../models/payment_log')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'params',
  'method',
  'status',
  'paid_at',
  'amount',
  'orderId'
]
const associations = [
  ['belongsTo', 'Order']
]

describe('# Payment_log Model', () => {
  compareModelName(Payment_logModel, 'Payment_log')
  checkModelProperties(Payment_logModel, properties)
  checkModelAssociations(Payment_logModel, associations)
  checkModelCRUD(Payment_log)
})