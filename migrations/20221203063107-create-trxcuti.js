'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trxcutis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcuti: {
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.STRING
      },
      idjenisCUti: {
        type: Sequelize.INTEGER
      },
      tanggalmulai: {
        type: Sequelize.DATE
      },
      tanggalakhir: {
        type: Sequelize.DATE
      },
      durasi: {
        type: Sequelize.INTEGER
      },
      alasan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdate: {
        type: Sequelize.DATE
      },
      approveby: {
        type: Sequelize.STRING
      },
      approvalreason: {
        type: Sequelize.STRING
      },
      approvalstatus: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('trxcutis');
  }
};