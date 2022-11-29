'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initUser = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      // define association here
      User.hasMany(models.Flat)
      User.hasMany(models.Booking)
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
export default initUser(connection,DataTypes)