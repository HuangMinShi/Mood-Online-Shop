'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    type: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});

  Color.associate = function (models) {
    Color.hasMany(models.Product)
  };
  return Color;
};