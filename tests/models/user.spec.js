process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { User } = require('../../models')
const UserModel = require('../../models/user')

const name = 'User'
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
  ['hasMany', 'Order']
]
const createOptions = {
  email: 'test@mail.com'
}

describe('# User Model', () => {
  compareModelName(UserModel, name)
  checkModelProperties(UserModel, properties)
  checkModelAssociations(UserModel, associations)
  checkModelCRUD(User, createOptions)
})