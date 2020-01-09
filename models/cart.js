'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {}, {});

  Cart.associate = function (models) {
    Cart.belongsToMany(models.ProductSku, {
      through: models.CartProductSku,
      foreignKey: 'CartId',
      as: 'cartItems'
    })
  };
  return Cart;
};