'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    sn: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    retailPrice: DataTypes.FLOAT,
    salePrice: DataTypes.FLOAT,
    cost: DataTypes.FLOAT,
    ColorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Colors',
        key: 'id'
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {});

  Product.associate = function (models) {
    Product.belongsTo(models.Category)
    Product.belongsTo(models.Color)
    Product.hasMany(models.ProductSku)
    Product.hasMany(models.Image)
  };
  return Product;
};