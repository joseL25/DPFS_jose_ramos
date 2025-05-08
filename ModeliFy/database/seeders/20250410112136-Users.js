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
        email: 'user@gmail.com',
        password: 'ABC123456',
        avatar: 'default.png',
        role: "user",
        // role_id: 1,
  }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
    
  }
};
