'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment_log = sequelize.define('Payment_log', {
    params: DataTypes.STRING,
    method: DataTypes.STRING,
    status: DataTypes.STRING,
    paid_at: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
  }, {});
  Payment_log.associate = function (models) {
    Payment_log.belongsTo(models.Order)
  };
  return Payment_log;
};