const { Model, DataTypes } = require('sequelize')

class statu extends Model {
    static init(sequelize){
        super.init({
            tipo: DataTypes.STRING(30),
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        },{
           sequelize 
        })
    }
}

module.exports = statu;
