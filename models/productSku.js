'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSku = sequelize.define('ProductSku', {
    sku: DataTypes.STRING,
    retailPrice: DataTypes.FLOAT,
    salePrice: DataTypes.FLOAT,
    cost: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {});

  ProductSku.associate = function (models) {
    ProductSku.belongsTo(models.Product)
    ProductSku.hasMany(models.ProductSkuAttribute, { onDelete: 'cascade', hooks: true })
    ProductSku.belongsToMany(models.User, {
      through: models.CartProductSku,
      foreignKey: 'productSkuId',
      as: 'productSkuUsers'
    })
    ProductSku.belongsToMany(models.Order, {
      through: models.OrderProductSku,
      foreignKey: 'productSkuId',
      as: 'productSkuOrders'
    })
  };
  return ProductSku;
};