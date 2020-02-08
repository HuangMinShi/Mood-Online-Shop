process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { PaymentLog } = require('../../models')
const PaymentLogModel = require('../../models/paymentLog')

const name = 'PaymentLog'
const properties = [
  'tradeNo',
  'paymentType',
  'status',
  'payTime',
  'amt',
  'OrderId'
]
const associations = [
  ['belongsTo', 'Order']
]

describe('# PaymentLog Model', () => {
  compareModelName(PaymentLogModel, name)
  checkModelProperties(PaymentLogModel, properties)
  checkModelAssociations(PaymentLogModel, associations)
  checkModelCRUD(PaymentLog)
})