process.env.NODE_ENV = 'test'

const {
  checkModelAssociations,
  compareModelName,
  checkModelCRUD
} = require('./libs/conTestFuncs')

const { Cart } = require('../../models')
const CartModel = require('../../models/cart')

const name = 'Cart'
const associations = [
  ['belongsToMany', 'ProductSku'],
  ['hasMany', 'CartProductSku']
]

describe('# Cart Model', () => {
  compareModelName(CartModel, name)
  checkModelAssociations(CartModel, associations)
  checkModelCRUD(Cart)
})