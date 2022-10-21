import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  timestamps: false,
});

export default UserModel;