'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSku = sequelize.define('ProductSku', {
    sku: DataTypes.STRING,
    size: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {});

  ProductSku.associate = function (models) {
    ProductSku.belongsTo(models.Product)
    ProductSku.belongsToMany(models.Cart, {
      through: models.CartProductSku,
      foreignKey: 'ProductSkuId',
      as: 'productSkuCarts'
    })
    ProductSku.belongsToMany(models.Order, {
      through: models.OrderProductSku,
      foreignKey: 'ProductSkuId',
      as: 'productSkuOrders'
    })
    ProductSku.hasMany(models.CartProductSku)
  };
  return ProductSku;
};