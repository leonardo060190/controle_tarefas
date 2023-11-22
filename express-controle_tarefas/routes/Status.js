const express = require('express'); // importa biblioteca do express

const Status = require('../controller/StatusController');//importa o arquivo StatusController da pasta controller


const routes = express.Router();//importa biblioteca router do express router



routes.get('/status', Status.index)// rota que busca todos os status

routes.post('/status', Status.store)// rota para criar uma novo status

routes.delete('/status/:tipo', Status.delete)// rota para deletar uma rota pelo tipo


module.exports = routes; // exporta as rotas para toda plicação