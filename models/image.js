'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING,
    isMain: DataTypes.BOOLEAN,
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {});

  Image.associate = function (models) {
    Image.belongsTo(models.Product)
  };
  return Image;
};