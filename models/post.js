'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{
        foreignKey: 'UserId'
      })
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "title cannot be empty"
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "url cannot be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "descripttion cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};