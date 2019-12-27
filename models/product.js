'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId: {
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
    Product.hasMany(models.Image, { onDelete: 'cascade', hooks: true })
    Product.hasMany(models.Product_sku, { onDelete: 'cascade', hooks: true })
  };
  return Product;
};