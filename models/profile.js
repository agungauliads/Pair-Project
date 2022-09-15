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
      defaultValue: ""
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
      defaultValue: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};