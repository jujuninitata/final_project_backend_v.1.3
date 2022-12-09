'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('newjatahcutis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.STRING
      },
      idjeniscuti: {
        type: Sequelize.INTEGER
      },
      periode: {
        type: Sequelize.INTEGER
      },
      kuota: {
        type: Sequelize.INTEGER
      },
      cutidigunakan: {
        type: Sequelize.INTEGER
      },
      sisacuti: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('newjatahcutis');
  }
};