'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentLog = sequelize.define('PaymentLog', {
    tradeNo: DataTypes.STRING,
    paymentType: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    payTime: DataTypes.DATE,
    amt: DataTypes.FLOAT,
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