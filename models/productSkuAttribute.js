'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductSkuAttribute = sequelize.define('ProductSkuAttribute', {
    attribute: DataTypes.STRING,
    value: DataTypes.STRING,
    productSkuId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductSkus',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {});

  ProductSkuAttribute.associate = function (models) {
    ProductSkuAttribute.belongsTo(models.ProductSku)
  };
  return ProductSkuAttribute;
};