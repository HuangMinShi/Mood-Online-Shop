'use strict';

const faker = require('faker')
const { sequelize } = require('../models')

const products = [
  {
    name: 'MEN\'S BRTN CREW SWEATSHIRT',
    description: faker.lorem.lines(2),
    category_id: 2
  },
  {
    name: 'MEN\'S CROWN BONDED FULL- ZIP HOODIE',
    description: faker.lorem.lines(2),
    category_id: 2
  },
  {
    name: 'MEN\'S CREEKSIDE SHORT',
    description: faker.lorem.lines(2),
    category_id: 4
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {})
  },

  down: (queryInterface, Sequelize) => {
    try {
      return sequelize.transaction(async (t) => {
        const options = { transaction: t }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        await sequelize.query('TRUNCATE TABLE Products', null, options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
    } catch (err) {
      console.log(err)
    }
  }
};

