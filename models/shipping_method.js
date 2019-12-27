'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipping_method = sequelize.define('Shipping_method', {
    name: DataTypes.STRING,
    fee: DataTypes.INTEGER
  }, {});
  Shipping_method.associate = function (models) {
    Shipping_method.hasMany(models.Order)
  };
  return Shipping_method;
};