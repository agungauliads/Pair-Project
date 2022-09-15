'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: 'UserId'
      })
      User.hasMany(models.Post, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(el, option){
    const salt = bcryptjs.genSaltSync(5);
    const hash = bcryptjs.hashSync(el.password, salt);
    el.password = hash
  }
},
  sequelize,
  modelName: 'User',
  });
return User;
};