'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile.init(
    {
      userid: DataTypes.STRING,
      nip: DataTypes.STRING,
      email: DataTypes.STRING,
      nama: DataTypes.STRING,
      tempatlahir: DataTypes.STRING,
      tanggallahir: DataTypes.DATE,
      jeniskelamin: DataTypes.INTEGER,
      telp: DataTypes.STRING,
      kodeunit: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      statusnikah: DataTypes.INTEGER,
      agama: DataTypes.INTEGER,
      alamat: DataTypes.STRING,
      kodeprovinsi: DataTypes.INTEGER,
      kodekota: DataTypes.INTEGER,
      kodekecamatan: DataTypes.INTEGER,
      kodekelurahan: DataTypes.INTEGER,
      kodepos: DataTypes.INTEGER,
      rt: DataTypes.INTEGER,
      rw: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'profile',
    },
  );
  return profile;
};
