'use strict';
import connection from '../connection'
const {Model,DataTypes} = require('sequelize');
const initBooking = (sequelize, DataTypes) => {
  class Booking extends Model {
    
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Flat)
      Booking.belongsTo(models.User)
    }
  }
  Booking.init({
    FlatId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    date_from: DataTypes.DATE,
    date_to: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
export default initBooking(connection,DataTypes)