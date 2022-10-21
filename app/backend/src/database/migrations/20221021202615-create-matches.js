'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', { 
      id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      home_team_goals: Sequelize.INTEGER,
      home_team: {
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id'}      
      },
      away_team: {
        type: Sequelize.INTEGER,
        references: { model: 'teams', key: 'id'}      
      },
      away_team_goals: Sequelize.INTEGER,
      in_progress: Sequelize.BOOLEAN
    }, {
      timestamps: false,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches')
  }
};
