'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initCity = (sequelize, DataTypes) => {
  class City extends Model {
    
    static associate(models) {
      // define association here
      City.belongsTo(models.Flat)
    }
  }
  City.init({
    name: DataTypes.STRING,
    country_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};
export default initCity(connection, DataTypes)