const { Model, DataTypes } = require('sequelize')

class usuario_tarefa extends Model {
    static init(sequelize){
        super.init({
            id_usuario: DataTypes.INTEGER,
            id_tarefa: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = usuario_tarefa;
