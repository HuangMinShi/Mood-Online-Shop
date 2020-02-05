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
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0'
    },
    avatar: DataTypes.STRING,
    address: DataTypes.STRING,
    tel: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member'
    }
  }, {});

  User.associate = function (models) {
    User.hasMany(models.Order)
  };
  return User;
};