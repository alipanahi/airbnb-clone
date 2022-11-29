import { imageConfigDefault } from 'next/dist/shared/lib/image-config.js';
import Sequelize from 'sequelize';
import config from './config/config.mjs';
import Booking from './models/booking.js';
import City from './models/city.js';
import Flat from './models/flat.js';
import Image from './models/image.js';
import User from './models/user.js';

const db = {};
db.User = User
db.City = City
db.Image = Image
db.Flat = Flat
db.Booking = Booking

let sequelize;
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(config.production);
} else {
  sequelize = new Sequelize(config.development);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
