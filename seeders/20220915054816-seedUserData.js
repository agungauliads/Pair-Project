'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    let dataUsers = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
    dataUsers = dataUsers.map((el) => {

      el.createdAt = new Date ();
      el.updatedAt = new Date ();
      return el;
    });

    return queryInterface.bulkInsert('Users', dataUsers, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
