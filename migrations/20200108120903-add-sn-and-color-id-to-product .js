'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.addColumn('Products', 'sn', Sequelize.STRING),
        queryInterface.addColumn('Products', 'color_id', {
          type: Sequelize.INTEGER,
          references: {
            model: 'Colors',
            key: 'id'
          }
        }),
      ])
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await Promise.all([
        queryInterface.removeColumn('Products', 'sn'),
        queryInterface.removeColumn('Products', 'color_id'),
        queryInterface.removeConstraint('Products', 'products_ibfk_1')
      ])
    } catch (err) {
      console.log(err)
    }
  }
}