'use strict';

const { sequelize } = require('../models')
const shippingMethods = [
  {
    name: '門市自取',
    fee: 0
  },
  {
    name: '店到店',
    fee: 80
  },
  {
    name: '宅配',
    fee: 100
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shipping_methods', shippingMethods, {})
  },

  down: (queryInterface, Sequelize) => {
    try {
      return sequelize.transaction(async (t) => {
        const options = { transaction: t }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        await sequelize.query('TRUNCATE TABLE Shipping_methods', null, options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
    } catch (err) {
      console.log(err)
    }
  }
};

