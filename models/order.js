'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    sn: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    orderName: DataTypes.STRING,
    orderAddress: DataTypes.STRING,
    orderEmail: DataTypes.STRING,
    orderPhone: DataTypes.STRING,
    invoice: DataTypes.STRING,
    note: DataTypes.STRING,
    receiveName: DataTypes.STRING,
    receiveAddress: DataTypes.STRING,
    receiveEmail: DataTypes.STRING,
    receivePhone: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    ShippingMethodId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ShippingMethods',
        key: 'id'
      }
    }
  }, {});
  Order.associate = function (models) {
    Order.belongsToMany(models.ProductSku, {
      through: models.OrderProductSku,
      foreignKey: 'OrderId',
      as: 'orderItems'
    })
    Order.belongsTo(models.User)
    Order.hasMany(models.PaymentLog)
    Order.belongsTo(models.ShippingMethod)
  };
  return Order;
};