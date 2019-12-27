'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_sku = sequelize.define('Product_sku', {
    sku: DataTypes.STRING,
    retail_price: DataTypes.FLOAT,
    sale_price: DataTypes.FLOAT,
    cost: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {});

  Product_sku.associate = function (models) {
    Product_sku.belongsTo(models.Product)
    Product_sku.hasMany(models.Product_sku_attribute, { onDelete: 'cascade', hooks: true })
    Product_sku.belongsToMany(models.User, {
      through: models.Cart_product_sku,
      foreignKey: 'product_skuId',
      as: 'productSkuUsers'
    })
    Product_sku.belongsToMany(models.Order, {
      through: models.Order_product_sku,
      foreignKey: 'product_skuId',
      as: 'productSkuOrders'
    })
  };
  return Product_sku;
};