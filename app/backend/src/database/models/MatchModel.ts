import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  public id: number;
  public homeTeam: string;
  public homeTeamGoals: string;
  public awayTeam: string;
  public awayTeamGoals: string;
  public inProgress: boolean;
}

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeam: DataTypes.STRING,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.STRING,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchModel;
