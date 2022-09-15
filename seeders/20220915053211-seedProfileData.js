'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    let dataProfiles = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8'));
    dataProfiles = dataProfiles.map((el) => {

      el.createdAt = new Date ();
      el.updatedAt = new Date ();
      return el;
    });

    return queryInterface.bulkInsert('Profiles', dataProfiles, {});
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
    return queryInterface.bulkDelete('Profiles', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
