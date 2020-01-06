'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentLog = sequelize.define('PaymentLog', {
    params: DataTypes.STRING,
    method: DataTypes.STRING,
    status: DataTypes.STRING,
    paidAt: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    OrderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
  }, {});
  PaymentLog.associate = function (models) {
    PaymentLog.belongsTo(models.Order)
  };
  return PaymentLog;
};