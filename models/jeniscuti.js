'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jeniscuti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jeniscuti.init({
    idjeniscuti: DataTypes.INTEGER,
    jeniskelamin: DataTypes.STRING,
    namacuti: DataTypes.STRING,
    maxhari: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'jeniscuti',
  });
  return jeniscuti;
};