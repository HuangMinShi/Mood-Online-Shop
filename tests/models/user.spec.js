process.env.NODE_ENV = 'test'

const { User } = require('../../models')
const UserModel = require('../../models/user')

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const properties = [
  'name',
  'email',
  'password',
  'birthday',
  'admin',
  'avatar',
  'address',
  'tel',
  'role'
]
const associations = [
  ['belongsToMany', 'Product_sku'],
  ['hasMany', 'Order']
]
const createOptions = {
  email: 'test@mail.com'
}

describe('# User Model', () => {
  compareModelName(UserModel, 'User')
  checkModelProperties(UserModel, properties)
  checkModelAssociations(UserModel, associations)
  checkModelCRUD(User, createOptions)
})