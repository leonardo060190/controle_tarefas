const { Model, DataTypes } = require('sequelize')

class tarefa extends Model {
    static init(sequelize){
        super.init({
            titulo: DataTypes.STRING(80),
            descricao: DataTypes.TEXT,
            id_status: DataTypes.INTEGER,
            data_criacao: DataTypes.DATE,
            data_limite: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = tarefa;
