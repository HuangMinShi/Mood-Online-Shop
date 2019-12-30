'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartProductSku = sequelize.define('CartProductSku', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
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
  CartProductSku.associate = function (models) {

  };
  return CartProductSku;
};