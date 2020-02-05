'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sn: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '1'
      },
      total_amount: {
        type: Sequelize.INTEGER
      },
      receipt: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      shipping_way: {
        type: Sequelize.STRING
      },
      receive_name: {
        type: Sequelize.STRING
      },
      receive_address: {
        type: Sequelize.STRING
      },
      receive_country: {
        type: Sequelize.STRING
      },
      receive_phone: {
        type: Sequelize.STRING
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};