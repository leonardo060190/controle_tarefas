'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tarefas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data_criacao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Status',
          key: 'id'
        }
      },
      data_limite: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tarefas');
  }
};