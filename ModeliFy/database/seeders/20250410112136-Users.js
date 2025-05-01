'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'users', [
        {
        id: 1,
        name: 'Jose',
        lastname: 'Ramos',
        email: 'admin@gmail.com',
        password: 'DEF123456',
        avatar: 'default.png',
        role: 1,
  }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
    
  }
};
