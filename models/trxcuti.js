'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trxcuti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trxcuti.init(
    {
      idcuti: DataTypes.STRING,
      userid: DataTypes.STRING,
      idjenisCUti: DataTypes.INTEGER,
      tanggalmulai: DataTypes.DATE,
      tanggalakhir: DataTypes.DATE,
      durasi: DataTypes.INTEGER,
      alasan: DataTypes.STRING,
      status: DataTypes.STRING,
      createdate: DataTypes.DATE,
      approveby: DataTypes.STRING,
      approvalreason: DataTypes.STRING,
      approvalstatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'trxcuti',
    },
  );
  return trxcuti;
};
