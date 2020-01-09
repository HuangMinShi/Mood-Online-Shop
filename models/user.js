'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    admin: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    tel: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    User.hasMany(models.Order)
  };
  return User;
};