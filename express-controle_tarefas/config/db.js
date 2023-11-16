const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dialect: 'mysql', //tipo de linguagem
    host: process.env.DB_HOST,//local a onde está o banco de dados
    username: process.env.DB_USER,
    port: process.env.DB_PORT,// porta do banco de dados
    password: process.env.DB_PASSWORD,//senha do banco de dados
    database: process.env.DB_NAME,//nome do banco de dados que vai utilizar no projeto
    define: {
    timestamps: false,//data de crição e data de alteração
    underscored: true
    
    }
    
    }