'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    mainCategory: DataTypes.STRING,
    subCategory: DataTypes.STRING,
    subSubCategory: DataTypes.STRING
  }, {});

  Category.associate = function (models) {
    Category.hasMany(models.Product)
  };
  return Category;
};