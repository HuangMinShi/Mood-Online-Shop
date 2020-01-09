'use strict';

const faker = require('faker')
const { sequelize } = require('../models')

const products = [
  {
    sn: '0001',
    name: 'MEN\'S BRTN CREW SWEATSHIRT',
    description: faker.lorem.lines(2),
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    color_id: 1,
    category_id: 2
  },
  {
    sn: '0001',
    name: 'MEN\'S BRTN CREW SWEATSHIRT',
    description: faker.lorem.lines(2),
    retail_price: 3000.00,
    sale_price: 2800.00,
    cost: 2000.00,
    color_id: 2,
    category_id: 2
  },
  {
    sn: '0002',
    name: 'MEN\'S CROWN BONDED FULL- ZIP HOODIE',
    description: faker.lorem.lines(2),
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    color_id: 1,
    category_id: 2
  },
  {
    sn: '0002',
    name: 'MEN\'S CROWN BONDED FULL- ZIP HOODIE',
    description: faker.lorem.lines(2),
    retail_price: 4200.00,
    sale_price: 3900.00,
    cost: 1800.00,
    color_id: 2,
    category_id: 2
  },
  {
    sn: '0003',
    name: 'MEN\'S CREEKSIDE SHORT',
    description: faker.lorem.lines(2),
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    color_id: 3,
    category_id: 4
  },
  {
    sn: '0003',
    name: 'MEN\'S CREEKSIDE SHORT',
    description: faker.lorem.lines(2),
    retail_price: 2850.00,
    sale_price: 2450.00,
    cost: 2000.00,
    color_id: 4,
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

