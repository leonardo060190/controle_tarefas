//importa a biblioteca do sequelize
const Sequelize = require('sequelize');

//importa a configuração do banco de dados do ../config/dbarquivo.
//Este arquivo contém os parâmetros de conexão do banco de dados
const dbConfig = require('../config/db');

//importa o Usuariosmodelo do ../models/usuario.
//Este modelo representa a tabela usuarios no banco de dados.
const Usuarios = require('../models/usuario');

//importa o Tarefamodelo do ../models/tarefa.
//Este modelo representa a tabela tarefas no banco de dados.
const Tarefa = require('../models/tarefa');

//importa o Tarefamodelo do ../models/Usuario_tarefa.
//Este modelo representa a tabela tarefas no banco de dados.
const Usuario_tarefas = require('../models/Usuario_tarefa');

//importa o Statusmodelo do ../models/statu.
//Este modelo representa a tabela status no banco de dados.
const Status = require('../models/statu');


//cria uma nova instância do Sequelize usando a configuração do banco de dados do dbConfig.
//Isso estabelece a conexão com o banco de dados.
const connection = new Sequelize(dbConfig);


// Inicializa o modelo com a conexão Sequelize especificada.
// Isso prepara o modelo para interagir com as tabelas, no banco de dados.
Usuarios.init(connection);
Tarefa.init(connection);
Usuario_tarefas.init(connection);
Status.init(connection);


module.exports = connection;//exporta para toda aplicação