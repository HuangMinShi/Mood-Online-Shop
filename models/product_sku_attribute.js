'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_sku_attribute = sequelize.define('Product_sku_attribute', {
    attribute: DataTypes.STRING,
    value: DataTypes.STRING,
    product_skuId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product_skus',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {});

  Product_sku_attribute.associate = function (models) {
    Product_sku_attribute.belongsTo(models.Product_sku)
  };
  return Product_sku_attribute;
};