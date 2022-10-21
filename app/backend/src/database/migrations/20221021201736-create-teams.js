'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      team_name: Sequelize.STRING, 
    }, {
      timestamps: false,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
