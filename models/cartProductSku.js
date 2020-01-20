'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartProductSku = sequelize.define('CartProductSku', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: '單次單項購買最少 1 件，請確認'
        },
        max: {
          args: 3,
          msg: '單次單項購買最多 3 件，您已購買 3 件，請確認'
        },
      },
    },
    CartId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Carts',
        key: 'id'
      }
    },
    ProductSkuId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductSkus',
        key: 'id'
      }
    },
  }, {});
  CartProductSku.associate = function (models) {

  };
  return CartProductSku;
};