const Tarefas = require('../models/tarefa')//Importa o arquivo tarefas da pasta Models
const sequelize = require('../dataBase/index');// Importa as configurações do banco da arquivo '../dataBase/index'

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //método para retonar todas as tarefas
    async index(req, res) {
        await Tarefas.sequelize.query(`SELECT 
        tarefas.id,
        titulo,
        descricao,
        tipo,
        data_criacao,
        data_limite
        FROM 
        tarefas 
        left join 
        status 
        on 
        status.id = 
        tarefas.id_status`
        )
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
    async buscaTitulo(req, res) {
        try {
            const [results] = await Tarefas.sequelize.query(
                `SELECT tarefas.id,
            titulo,
            descricao,
            tipo,
            data_criacao,
            data_limite
            FROM 
            tarefas 
            left join 
            status 
            on 
            status.id = 
            tarefas.id_status
           WHERE 
           titulo 
           LIKE ?`,
                { replacements: [`%${req.params.titulo}%`] }
            );

            if (!results || results.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "Nenhuma tarefa encontrada com o título fornecido.",
                    data: [], // ou null, dependendo de como você quer lidar com isso no frontend
                });
                return;
            }
            res.json({
                success: true,
                message: "Tarefas encontradas com sucesso.",
                data: results,
            });

        } catch (error) {
            console.error('Erro ao buscar tarefas por título:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //método que busca as tarefas referente ao titulo informado
    async buscaId(req, res) {
        try {
            const [results] = await Tarefas.sequelize.query(
                `
                SELECT 
                    tarefas.id,
                    titulo,
                    descricao,
                    tipo,
                    data_criacao,
                    data_limite
                FROM 
                    tarefas 
                    LEFT JOIN status ON status.id = tarefas.id_status
                WHERE
                    tarefas.id = ?
                `,
                { replacements: [req.params.id] }
            );
            if (!results[0]) {
                res.status(404).json({
                    success: false,
                    message: "Tarefas não encontrado",
                });
                return;
            }

            res.json(results[0]);
        } catch (error) {
            console.error('Error fetching tasks by ID:', error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
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
                id = ?`,
            {
                replacements: [
                    req.body.titulo,
                    req.body.descricao,
                    req.body.id_status,
                    req.body.data_criacao,
                    req.body.data_limite,
                    new Date(),
                    req.params.id
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
                        new Date()

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