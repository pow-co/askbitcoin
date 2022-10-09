
import { Model, DataTypes } from 'sequelize';

  export class KeyValue extends Model {
    id: number;
    key: string;
    value: any;
    static associate(models) {
      // define association here
    }
  };

  export function init(sequelize) {

    KeyValue.init({
      key: DataTypes.STRING,
      value: DataTypes.JSON
    }, {
      sequelize,
      modelName: 'KeyValue',
      tableName: 'KeyValues'
    });

    return KeyValue;

  }
