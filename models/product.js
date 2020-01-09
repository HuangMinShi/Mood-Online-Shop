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
      },
      // What should happen when the referenced key is updated.
      onUpdate: 'cascade'
    }
  }, {});

  Product.associate = function (models) {
    Product.belongsTo(models.Category)
    Product.belongsTo(models.Color)
    Product.hasMany(models.ProductSku, { onDelete: 'cascade', hooks: true })
    Product.hasMany(models.Image, { onDelete: 'cascade', hooks: true })
  };
  return Product;
};