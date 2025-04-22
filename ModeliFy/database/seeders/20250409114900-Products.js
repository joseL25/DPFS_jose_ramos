'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products', [
      {
        name: 'cohete',
        description: '',
        price: '',
        category_id: '',
        file_id: '',
        image: ''
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {});
    
  }
};
