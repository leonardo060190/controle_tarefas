const express = require('express'); // importa biblioteca do express

const Status = require('../controller/StatusController');//importa o arquivo StatusController da pasta controller


const router = express.Router();//importa biblioteca router do express router



router.get('/status', Status.index)// rota que busca todos os status

router.post('/status', Status.store)// rota para criar uma novo status

router.delete('/status/:tipo', Status.delete)// rota para deletar uma rota pelo tipo


module.exports = router; // exporta as rotas para toda plicação