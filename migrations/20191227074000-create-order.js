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
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      order_name: {
        type: Sequelize.STRING
      },
      order_address: {
        type: Sequelize.STRING
      },
      order_email: {
        type: Sequelize.STRING
      },
      order_phone: {
        type: Sequelize.STRING
      },
      invoice: {
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
      shipping_method_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shipping_methods',
          key: 'id'
        }
      },
      receive_name: {
        type: Sequelize.STRING
      },
      receive_address: {
        type: Sequelize.STRING
      },
      receive_email: {
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