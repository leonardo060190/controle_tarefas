const Usuario_tarefas = require('../models/Usuario_tarefa')//Importa o arquivo Usuarios da pasta Models
const sequelize = require('../dataBase/index');// Importa as configurações do banco da arquivo '../dataBase/index'

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //método para retonar todos os Usuários
    async index(req, res) {
        await Usuario_tarefas.sequelize.query(`SELECT 
                                            usuarios.nome, 
                                            usuarios.sobrenome, 
                                            tarefas.titulo, 
                                            tarefas.descricao, 
                                            tarefas.data_limite,
                                            status.tipo 
                                                FROM 
                                            usuario_tarefas
                                                LEFT JOIN
                                            usuarios ON usuarios.id = usuario_tarefas.id_usuario
                                                LEFT JOIN
                                            tarefas ON tarefas.id = usuario_tarefas.id_tarefa
                                                LEFT JOIN
                                            status ON status.id = tarefas.id_status
                                                ORDER BY 
                                            nome `)
            .then(([results, metadata]) => {
                if (results.length > 0) {
                    res.json(results);
                } else {
                    res.status(404).json({
                        success: false,
                        message: "Não há cadastros",
                    });
                }
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // método para altera os dados que for refente os e-mail informado
    async update(req, res) {
        await Usuario_tarefas.sequelize.query(
            `UPDATE usuario_tarefas SET 
            id_usuario = ?,
            id_tarefa = ?
        WHERE 
            id = ?`,
            {
                replacements: [
                    req.body.id_usuario,
                    req.body.id_tarefa,
                    req.params.id
                ]
            }
        )
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "id não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Cadastro atualizado com sucesso",
                    });
                }
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });

    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //método para que insere um novo Usuário na tabela
    async store(req, res) {
        
        await Usuario_tarefas.sequelize.query(
            `INSERT INTO usuario_tarefas (
                id_usuario,
                id_tarefa
            )
        VALUES (?, ?)`,
            {
                replacements:
                    [
                        req.body.id_usuario,
                        req.body.id_tarefa
                    ]

            }
        )
            .then(([results, metadata]) => {
                res.status(201).json({
                    success: true,
                    message: "cadastrado com sucesso",
                });
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

};//fim do export