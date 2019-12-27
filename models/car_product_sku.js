'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart_product_sku = sequelize.define('Cart_product_sku', {
    quantity: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    product_skuId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product_skus',
        key: 'id'
      }
    },
  }, {});
  Cart_product_sku.associate = function (models) {

  };
  return Cart_product_sku;
};