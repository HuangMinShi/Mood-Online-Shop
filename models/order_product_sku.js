'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_product_sku = sequelize.define('Order_product_sku', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: DataTypes.INTEGER,
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
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
  Order_product_sku.associate = function (models) {
    // associations can be defined here
  };
  return Order_product_sku;
};