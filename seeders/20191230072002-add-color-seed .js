'use strict';

const { sequelize } = require('../models')
const colors = [
  {
    type: 'true_black',
    url: '../images/colors/true_black.jpg'
  },
  {
    type: 'gray_heather',
    url: '../images/colors/gray_heather.jpg'
  },
  {
    type: 'slate_pop_floral',
    url: '../images/colors/slate_pop_floral.jpg'
  },
  {
    type: 'outland',
    url: '../images/colors/outland.jpg'
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Colors', colors, {})
  },

  down: (queryInterface, Sequelize) => {
    try {
      return sequelize.transaction(async (t) => {
        const options = { transaction: t }

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, options)
        await sequelize.query('TRUNCATE TABLE Colors', null, options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
    } catch (err) {
      console.log(err)
    }
  }
};

