'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class newjatahcuti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  newjatahcuti.init({
    userid: DataTypes.STRING,
    idjeniscuti: DataTypes.INTEGER,
    periode: DataTypes.INTEGER,
    kuota: DataTypes.INTEGER,
    cutidigunakan: DataTypes.INTEGER,
    sisacuti: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'newjatahcuti',
  });
  return newjatahcuti;
};