'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeConstraint('Cart_product_skus', 'cart_product_skus_ibfk_1')
      await queryInterface.renameColumn('Cart_product_skus', 'user_id', 'cart_id')
      return await queryInterface.changeColumn('Cart_product_skus', 'cart_id', {
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
      await queryInterface.removeConstraint('Cart_product_skus', 'cart_product_skus_ibfk_3')
      await queryInterface.renameColumn('Cart_product_skus', 'cart_id', 'user_id')
      return await queryInterface.changeColumn('Cart_product_skus', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
    } catch (err) {
      console.log(err)
    }
  }
};
