'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.STRING
      },
      nip: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      tempatlahir: {
        type: Sequelize.STRING
      },
      tanggallahir: {
        type: Sequelize.DATE
      },
      jeniskelamin: {
        type: Sequelize.INTEGER
      },
      telp: {
        type: Sequelize.STRING
      },
      kodeunit: {
        type: Sequelize.STRING
      },
      jabatan: {
        type: Sequelize.STRING
      },
      statusnikah: {
        type: Sequelize.INTEGER
      },
      agama: {
        type: Sequelize.INTEGER
      },
      alamat: {
        type: Sequelize.STRING
      },
      kodeprovinsi: {
        type: Sequelize.INTEGER
      },
      kodekota: {
        type: Sequelize.INTEGER
      },
      kodekecamatan: {
        type: Sequelize.INTEGER
      },
      kodekelurahan: {
        type: Sequelize.INTEGER
      },
      kodepos: {
        type: Sequelize.INTEGER
      },
      rt: {
        type: Sequelize.INTEGER
      },
      rw: {
        type: Sequelize.INTEGER
      },
      roleId: {
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
    await queryInterface.dropTable('profiles');
  }
};