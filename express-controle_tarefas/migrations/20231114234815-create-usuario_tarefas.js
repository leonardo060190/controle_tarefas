'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario_tarefas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      id_tarefa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Tarefas',
          key: 'id'
        }
      }
    })
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuario_tarefas');
  }
};