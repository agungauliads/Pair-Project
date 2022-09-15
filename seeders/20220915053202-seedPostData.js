'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    let dataPosts = JSON.parse(fs.readFileSync('./data/posts.json', 'utf-8'));
    dataPosts = dataPosts.map((el) => {

      el.createdAt = new Date ();
      el.updatedAt = new Date ();
      return el;
    });

    return queryInterface.bulkInsert('Posts', dataPosts, {});
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
    return queryInterface.bulkDelete('Posts', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
