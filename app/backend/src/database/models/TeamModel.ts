import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  public id: number;
  public teamname: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
});

export default TeamModel;
