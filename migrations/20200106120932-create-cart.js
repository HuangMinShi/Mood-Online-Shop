'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.createTable('Carts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        }
      });
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.dropTable('Carts');
    } catch (err) {
      console.log(err)
    }
  }
};