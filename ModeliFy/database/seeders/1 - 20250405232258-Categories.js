'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories', [
      {name:'esculpido'},
      {name:'solido'},
      {name:'superficie'},
      {name:'procedimental'},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete("categories", null, {});

  }
};
