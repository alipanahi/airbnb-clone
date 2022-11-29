'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initImage = (sequelize, DataTypes) => {
  class Image extends Model {
    
    static associate(models) {
      // define association here
      Image.belongsTo(models.Flat)
    }
  }
  Image.init({
    path: DataTypes.STRING,
    FlatId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
export default initImage(connection,DataTypes)