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
    CartId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carts',
        key: 'id'
      }
    },
    ProductSkuId: {
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