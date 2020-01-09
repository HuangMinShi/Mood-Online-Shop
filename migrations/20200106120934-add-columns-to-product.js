'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.addColumn('Products', 'retail_price', Sequelize.STRING),
        queryInterface.addColumn('Products', 'sale_price', Sequelize.STRING),
        queryInterface.addColumn('Products', 'cost', Sequelize.STRING)
      ])
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.removeColumn('Products', 'retail_price', Sequelize.STRING),
        queryInterface.removeColumn('Products', 'sale_price', Sequelize.STRING),
        queryInterface.removeColumn('Products', 'cost', Sequelize.STRING)
      ])
    } catch (err) {
      console.log(err)
    }
  }
}