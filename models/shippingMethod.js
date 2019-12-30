'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShippingMethod = sequelize.define('ShippingMethod', {
    name: DataTypes.STRING,
    fee: DataTypes.INTEGER
  }, {});
  ShippingMethod.associate = function (models) {
    ShippingMethod.hasMany(models.Order)
  };
  return ShippingMethod;
};