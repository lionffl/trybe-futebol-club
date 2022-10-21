'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', { 
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true 
      },
      home_team_goals: Sequelize.INTEGER,
      home_team: {
        type: Sequelize.STRING,
        references: { model: 'teams', key: 'id'}      
      },
      away_team: {
        type: Sequelize.STRING,
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
