'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('status', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING(30),
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

    await queryInterface.bulkInsert('status', [
      {
        tipo: 'Concluido',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Aprovado',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Em_Andamento',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Aguardando',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Cancelado',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Em_Espera',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Pendente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Aguardando_confirmação',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tipo: 'Aguardando_aprovação',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

     // Adicionando uma restrição UNIQUE para a coluna `user`
     await queryInterface.addConstraint('status', {
      type: 'unique',
      fields: ['tipo'],
      name: 'unique_tipo'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('statur', 'unique_tipo');
    await queryInterface.dropTable('status');
  }
};