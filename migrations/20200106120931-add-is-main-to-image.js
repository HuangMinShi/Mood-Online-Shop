'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.addColumn('Images', 'is_main', Sequelize.BOOLEAN)
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.removeColumn('Images', 'is_main')
    } catch (err) {
      console.log(err)
    }
  }
}