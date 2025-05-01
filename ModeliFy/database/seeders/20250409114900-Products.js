'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products', [
      {
        id: 1,
        name: 'cohete',
        description: 'Inspirado en los viajes interestelares',
        price: '15',
        category: 'solido',
        file: 'STL',
        image: 'http://localhost:3000/images/predeterminado/cohete.jpg'
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {});
    
  }
};
