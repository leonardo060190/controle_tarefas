const express = require('express'); // importa biblioteca do express

const Usuarios = require('../controller/Usuario_tarefasController');//importa o arquivo UsuariosController da pasta controller


const router = express.Router();//importa biblioteca router do express router



router.get('/usuario_tarefas', Usuarios.index)// rota para buscar todos os usuarios

router.post('/usuario_tarefas', Usuarios.store)//rota que cria um novo usuario

router.put('/usuario_tarefas/:id', Usuarios.update)//rota que altera os dados dos usuarios com referencia do e-mail informado


module.exports = router; // exporta as rotas para toda plicação