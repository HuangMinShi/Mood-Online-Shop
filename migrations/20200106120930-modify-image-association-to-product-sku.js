'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Images', 'color')
      await queryInterface.removeConstraint('Images', 'images_ibfk_1')
      await queryInterface.renameColumn('Images', 'product_id', 'product_sku_id')
      return await queryInterface.changeColumn('Images', 'product_sku_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Product_skus',
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
      await queryInterface.addColumn('Images', 'color', Sequelize.STRING)
      await queryInterface.removeConstraint('Images', 'images_ibfk_1')
      await queryInterface.renameColumn('Images', 'product_sku_id', 'product_id')
      return await queryInterface.changeColumn('Images', 'product_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
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
