process.env.NODE_ENV = 'test'

const { PaymentLog } = require('../../models')
const PaymentLogModel = require('../../models/paymentLog')

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
  'paidAt',
  'amount',
  'orderId'
]
const associations = [
  ['belongsTo', 'Order']
]

describe('# PaymentLog Model', () => {
  compareModelName(PaymentLogModel, 'PaymentLog')
  checkModelProperties(PaymentLogModel, properties)
  checkModelAssociations(PaymentLogModel, associations)
  checkModelCRUD(PaymentLog)
})