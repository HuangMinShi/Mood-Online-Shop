'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProductSku = sequelize.define('OrderProductSku', {
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
    productSkuId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductSkus',
        key: 'id'
      }
    },
  }, {});
  OrderProductSku.associate = function (models) {
    // associations can be defined here
  };
  return OrderProductSku;
};