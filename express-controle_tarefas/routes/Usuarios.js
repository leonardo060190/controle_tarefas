const express = require('express'); // importa biblioteca do express

const Usuarios = require('../controller/UsuariosController');//importa o arquivo UsuariosController da pasta controller


const router = express.Router();//importa biblioteca router do express router



router.get('/usuarios', Usuarios.index)// rota para buscar todos os usuarios

router.get('/usuarios/:nome', Usuarios.buscaNome)// rota que busca os usuarios pelo nome

router.post('/usuarios', Usuarios.store)//rota que cria um novo usuario

router.put('/usuarios/:email', Usuarios.update)//rota que altera os dados dos usuarios com referencia do e-mail informado

router.delete('/usuarios/:email', Usuarios.delete)// rota que deleta os usuarios com referencia do e-mail informado

module.exports = router; // exporta as rotas para toda plicação