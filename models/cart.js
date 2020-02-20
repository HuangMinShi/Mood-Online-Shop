'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {}, {});

  Cart.associate = function (models) {
    Cart.belongsToMany(models.ProductSku, {
      through: models.CartProductSku,
      foreignKey: 'CartId',
      as: 'cartItems'
    })
    Cart.hasMany(models.CartProductSku, { onDelete: 'cascade', hooks: true })
  };
  return Cart;
};