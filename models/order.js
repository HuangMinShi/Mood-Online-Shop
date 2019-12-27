'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    sn: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    order_name: DataTypes.STRING,
    order_address: DataTypes.STRING,
    order_email: DataTypes.STRING,
    order_phone: DataTypes.STRING,
    invoice: DataTypes.STRING,
    note: DataTypes.STRING,
    receive_name: DataTypes.STRING,
    receive_address: DataTypes.STRING,
    receive_email: DataTypes.STRING,
    receive_phone: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    shipping_methodId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Shipping_methods',
        key: 'id'
      }
    }
  }, {});
  Order.associate = function (models) {
    Order.belongsToMany(models.Product_sku, {
      through: models.Order_product_sku,
      foreignKey: 'orderId',
      as: 'orderItems'
    })
    Order.belongsTo(models.User)
    Order.hasMany(models.Payment_log)
    Order.belongsTo(models.Shipping_method)
  };
  return Order;
};