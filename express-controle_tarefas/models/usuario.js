const { Model, DataTypes } = require('sequelize');

// Define o modelo `usuarios`
class usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING(40),
      sobrenome: DataTypes.STRING(40),
      email: DataTypes.STRING,
      senha: DataTypes.STRING(8),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }, {
      sequelize
    });
  }
}

// Exporta o modelo `usuarios`
module.exports = usuario;