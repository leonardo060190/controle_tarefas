'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      sobrenome: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    // Adicionando uma restrição UNIQUE para a coluna `email`
    await queryInterface.addConstraint('usuarios', {
      type: 'unique',
      fields: ['email'],
      name: 'unique_email'
    });
     // Adicionando uma restrição UNIQUE para a coluna `senha`
     await queryInterface.addConstraint('usuarios', {
      type: 'unique',
      fields: ['senha'],
      name: 'unique_senha'
    });
  },


  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('usuarios', 'unique_email');
    await queryInterface.removeConstraint('usuarios', 'unique_senha');

    await queryInterface.dropTable('usuarios');
  }
};