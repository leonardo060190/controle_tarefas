
//Essas linhas de código importam os módulos necessários para a aplicação Express.
//Cada módulo fornece funcionalidades específicas para a aplicação.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


//Essas linhas de código importam os diferentes módulos de rota para o aplicativo Express.
//Cada módulo de rota é responsável por tratar solicitações relacionadas a um aspecto
//específico da aplicação.

// Este módulo é responsável por importar as rotas relacionadas aos usuários
const usuarioRouter = require('./routes/Usuarios');
//Este módulo é responsável por importar as rotas relacionadas a status
const statuRouter = require('./routes/Status');
// Este módulo é responsável por importar as rotas relacionadas a tarefas
const tarefaRouter = require('./routes/Tarefas');
// Este módulo é responsável por importar as rotas relacionadas a Usuario_tarefas
const Usuario_tarefasRouter = require('./routes/Usuario_tarefas');

const LoginRouter = require('./routes/login');

const app = express();

//Importa o arquivo de configuração do banco de dados
require('./config/db');



//configura o criador de logs do Morgan para usar o formato 'dev'
app.use(logger('dev'));
//analisa dados JSON enviados no corpo da solicitação.
app.use(express.json());
//analisa os dados do formulário enviados no corpo da solicitação.
app.use(express.urlencoded({ extended: false }));
//analisa cookies enviados pelo cliente.
app.use(cookieParser());
//Este middleware serve arquivos estáticos (CSS, JavaScript, imagens, etc.) do diretório 'público'.
app.use(express.static(path.join(__dirname, 'public')));
//Este middleware habilita CORS para todas as rotas.
app.use(cors());


//trata as rotas relacionadas aos usuários.
app.use(usuarioRouter);
//trata as rotas relacionadas aos status.
app.use(statuRouter);
//trata as rotas relacionadas às tarefas.
app.use(tarefaRouter);
//trata as rotas relacionadas às Usuario_tarefas.
app.use(Usuario_tarefasRouter);

app.use(LoginRouter);



//Tratamento de erros 404:
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Tratamento de erros gerais:
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});



module.exports = app;
