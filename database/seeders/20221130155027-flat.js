'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Flats', [{
      name: 'home',
      address: 'rome,italy',
      lon:9.15,
      lat:45.46,
      price: 100.40,
      booked: false,
      category: 'house',
      rooms: 3,
      UserId: 1,
      CityId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flats', null, {});
  }
};
