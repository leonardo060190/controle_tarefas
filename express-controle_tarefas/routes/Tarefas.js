const express = require('express'); // importa biblioteca do express

const Tarefas = require('../controller/TarefasController');//importa o arquivo TarefasController da pasta controller


const router = express.Router();//importa biblioteca router do express router



router.get('/tarefas', Tarefas.index)// rota para buscar todos os tarefas

router.get('/tarefas/:titulo', Tarefas.buscaTitulo)// rota que busca pelo titulo a tarefa relacionada

router.post('/tarefas', Tarefas.store)// rota que cria uma nova tarefa

router.put('/tarefas/:titulo', Tarefas.update)// rota que altera uma tarefa pelo titulo

router.delete('/tarefas/:id', Tarefas.delete) // rota que deleta uma tarefa pelo id


module.exports = router; // exporta as rotas para toda plicação