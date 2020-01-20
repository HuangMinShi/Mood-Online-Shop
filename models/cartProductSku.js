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
        min: 1,
        max: 10
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
  }, {
    validate: {
      quantityAboveValidationScope() {
        if (this.quantity < 1 || this.quantity > 10) {
          throw new Error('單一商品購買數量必須最少 1 件，最多 10 件，請確認!');
        }
      }
    }
  });
  CartProductSku.associate = function (models) {

  };
  return CartProductSku;
};