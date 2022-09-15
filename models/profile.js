'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
  }
  Profile.init({
    fullname: {
      type: DataTypes.STRING,
      defaultValue: "anonymous"
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};