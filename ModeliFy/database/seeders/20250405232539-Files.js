'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'files', [
      {name: 'OBJ'},
      {name: 'FBX'},
      {name: 'STL'},
      {name: 'IGES'},
      {name: 'AMF'},
    ], {});
    
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete("files", null, {});
     
  }
};
