'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeConstraint('Product_sku_attributes', 'product_sku_attributes_ibfk_1')
      return await queryInterface.dropTable('Product_sku_attributes')
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.createTable('Product_sku_attributes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        attribute: {
          type: Sequelize.STRING
        },
        value: {
          type: Sequelize.STRING
        },
        product_sku_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Product_skus',
            key: 'id'
          }
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
  }
};
