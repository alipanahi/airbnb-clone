'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initFlat = (sequelize, DataTypes) => {
  class Flat extends Model {
    
    static associate(models) {
      // define association here
      Flat.belongsTo(models.User)
      Flat.hasMany(models.Image)
      Flat.hasMany(models.Booking)
    }
  }
  Flat.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    booked: DataTypes.BOOLEAN,
    category: DataTypes.STRING,
    rooms: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flat',
    paranoid: true
  });
  return Flat;
};
export default initFlat(connection,DataTypes)