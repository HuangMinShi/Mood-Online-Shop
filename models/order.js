'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    sn: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: '0'
    },
    total: DataTypes.INTEGER,
    invoice: DataTypes.STRING,
    note: DataTypes.STRING,
    receiveName: DataTypes.STRING,
    receiveCountry: DataTypes.STRING,
    receiveAddress: DataTypes.STRING,
    receivePhone: DataTypes.STRING,
    shippingMethod: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  }, {});
  Order.associate = function (models) {
    Order.belongsToMany(models.ProductSku, {
      through: models.OrderProductSku,
      foreignKey: 'OrderId',
      as: 'orderItems'
    })
    Order.belongsTo(models.User)
    Order.hasMany(models.PaymentLog)
  };
  return Order;
};