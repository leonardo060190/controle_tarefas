const Usuarios = require('../models/usuario')//Importa o arquivo Usuarios da pasta Models
const sequelize = require('../dataBase/index');// Importa as configurações do banco da arquivo '../dataBase/index'

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //método para retonar todos os Usuários
    async index(req, res) {
        await Usuarios.sequelize.query(`SELECT * FROM usuarios ORDER BY nome `)
            .then(([results, metadata]) => {
                res.json(results);
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // método para busca do Usuário, referente ao nome informado
    async buscaNome(req, res) {
        await Usuarios.sequelize.query(`SELECT nome, sobrenome FROM usuarios WHERE nome = ?`,
            { replacements: [req.params.nome] })
            .then(([results, metadata]) => {
                if (results.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Usuário não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        Usuarios: results,
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
        await Usuarios.sequelize.query(
            `UPDATE usuarios SET 
            nome = ?,
            sobrenome = ?,
            senha = ?,
            email = ?,
            updated_at = ? 
        WHERE 
            email = ?`,
            {
                replacements: [
                    req.body.nome,
                    req.body.sobrenome,
                    req.body.senha,
                    req.body.email,
                    new Date(),
                    req.params.email
                ]
            }
        )
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Usuário não encontrado",
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
        // Verifique se o e-mail já está cadastrado
        const usuarioExistente = await Usuarios.findOne({
            where: { email: req.body.email }
        });

        if (usuarioExistente) {
            return res.status(400).json({
                success: false,
                message: "Email já está cadastrado."
            });
        }
        await Usuarios.sequelize.query(
            `INSERT INTO usuarios (
                nome,
                sobrenome,
                senha,
                email,
                created_at,
                updated_at
            )
        VALUES (?, ?, ?, ?, ?, ?)`,
            {
                replacements:
                    [
                        req.body.nome,
                        req.body.sobrenome,
                        req.body.senha,
                        req.body.email,
                        new Date(),
                        new Date()
                    ]

            }
        )
            .then(([results, metadata]) => {
                res.status(201).json({
                    success: true,
                    message: "Usuário cadastrado com sucesso",
                });
            }).catch((error) => {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // método para deleta o Usuário referente ao e-mail informado
    async delete(req, res) {
        await Usuarios.sequelize.query(`DELETE FROM usuarios WHERE email = ?`,
            { replacements: [req.params.email] })
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Usuàrio não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Usuário deletado com sucesso",
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