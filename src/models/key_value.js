'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeyValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  KeyValue.init({
    key: DataTypes.STRING,
    value: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'KeyValue',
    tableName: 'key_values'
  });
  return KeyValue;
};