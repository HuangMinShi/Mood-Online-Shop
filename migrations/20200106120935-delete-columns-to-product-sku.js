'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.removeColumn('Product_skus', 'retail_price', Sequelize.STRING),
        queryInterface.removeColumn('Product_skus', 'sale_price', Sequelize.STRING),
        queryInterface.removeColumn('Product_skus', 'cost', Sequelize.STRING),
        queryInterface.removeColumn('Product_skus', 'color', Sequelize.STRING)
      ])
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.addColumn('Product_skus', 'retail_price', Sequelize.STRING),
        queryInterface.addColumn('Product_skus', 'sale_price', Sequelize.STRING),
        queryInterface.addColumn('Product_skus', 'cost', Sequelize.STRING),
        queryInterface.addColumn('Product_skus', 'color', Sequelize.STRING)
      ])
    } catch (err) {
      console.log(err)
    }
  }
}