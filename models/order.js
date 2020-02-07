'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    sn: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: '1'
    },
    totalAmount: DataTypes.INTEGER,
    receipt: DataTypes.STRING,
    payment: DataTypes.STRING,
    note: DataTypes.STRING,
    receiveName: DataTypes.STRING,
    receiveCountry: DataTypes.STRING,
    receiveAddress: DataTypes.STRING,
    receivePhone: DataTypes.STRING,
    shippingWay: DataTypes.STRING,
    orderEmail: DataTypes.STRING,
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