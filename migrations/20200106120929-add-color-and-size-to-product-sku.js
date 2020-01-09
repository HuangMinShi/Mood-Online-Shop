'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.addColumn('Product_skus', 'color', Sequelize.STRING),
        queryInterface.addColumn('Product_skus', 'size', Sequelize.STRING)
      ])
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.removeColumn('Product_skus', 'color'),
        queryInterface.removeColumn('Product_skus', 'size')
      ])
    } catch (err) {
      console.log(err)
    }
  }
}