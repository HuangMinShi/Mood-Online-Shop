'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeConstraint('Cart_product_skus', 'cart_product_skus_ibfk_1')
      // 原本 rename, change column => MySQL key still is UserId 修改
      await queryInterface.removeColumn('Cart_product_skus', 'user_id')
      return await queryInterface.addColumn('Cart_product_skus', 'cart_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeConstraint('Cart_product_skus', 'Cart_product_skus_cart_id_foreign_idx')
      await queryInterface.removeColumn('Cart_product_skus', 'cart_id')
      return await queryInterface.addColumn('Cart_product_skus', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
};
