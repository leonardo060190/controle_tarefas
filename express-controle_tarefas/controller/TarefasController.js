const Tarefas = require('../models/tarefa')//Importa o arquivo tarefas da pasta Models
const sequelize = require('../dataBase/index');// Importa as configurações do banco da arquivo '../dataBase/index'

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //método para retonar todas as tarefas
    async index(req, res) {
        await Tarefas.sequelize.query(`SELECT * FROM tarefas ORDER BY titulo `)
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

    // método que busca as tarefas referente ao titulo informado
    async buscaTitulo(req, res) {
        await Tarefas.sequelize.query(`SELECT * FROM tarefas WHERE titulo = ?`,
            { replacements: [req.params.titulo] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Tarefas não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        Tarefas: results,
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

    // método para alterra os dados que for refente os titulo informado
    async update(req, res) {
        await Tarefas.sequelize.query(
            `UPDATE tarefas SET 
            titulo = ?,
            descricao = ?,
            id_status = ?,
            data_criacao = ?,
            data_limite = ?,
            updated_at = ? 
        WHERE 
            titulo = ?`,
            {
                replacements: [
                    req.body.titulo,
                    req.body.descricao,
                    req.body.id_status,
                    req.body.data_criacao,
                    req.body.data_limite,
                    new Date(),
                    req.params.titulo
                ]
            }
        )
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Tarefas não encontrado",
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

    //método para que insere uma nova tarefa na tabela
    async store(req, res) {
        // Verifique se o titulo já está cadastrado
        const tarefasExistente = await Tarefas.findOne({
            where: { titulo: req.body.titulo }
        });

        if (tarefasExistente) {
            return res.status(400).json({
                success: false,
                message: "Tarefa já está cadastrado."
            });
        }
        await Tarefas.sequelize.query(
            `INSERT INTO tarefas (
                titulo,
                descricao,
                id_status,
                data_criacao,
                data_limite,
                updated_at
                )
        VALUES (?, ?, ?, ?, ?, ?)`,
            {
                replacements:
                    [
                        req.body.titulo,
                        req.body.descricao,
                        req.body.id_status,
                        req.body.data_criacao,
                        req.body.data_limite,
                        req.body.updated_at
                       
                    ]

            }
        )
            .then(([results, metadata]) => {
                res.status(201).json({
                    success: true,
                    message: "Tarefa cadastrado com sucesso",
                });
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // método para deletar uma tarefas referente ao id informado
    async delete(req, res) {
        await Tarefas.sequelize.query(`DELETE FROM tarefas WHERE id = ?`,
            { replacements: [req.params.id] })
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Tarefa não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Tarefa deletado com sucesso",
                    });
                }
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            })
    }



};//fim do export