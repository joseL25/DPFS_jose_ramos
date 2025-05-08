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
        image: 'cohete.jpg'
      },
      {
        id: 2,
        name: 'arcade',
        description: 'descripcion de un arcade modelado en 3D',
        price: '23',
        category: 'solido',
        file: 'STL',
        image: 'arcade.jpg'
      },
      {
        id: 3,
        name: 'camara',
        description: 'descripcion de una camara modelada en 3D',
        price: '28',
        category: 'procedimental',
        file: 'STL',
        image: 'camara.jpg'
      },
      {
        id: 4,
        name: 'astronauta',
        description: 'Descripcion de un astronauta',
        price: '40',
        category: 'solido',
        file: 'STL',
        image: 'astronauta.jpg'
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {});
    
  }
};
