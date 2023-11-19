const Status = require('../models/statu')//Importa o arquivo status da pasta Models
const sequelize = require('../dataBase/index');// Importa as configurações do banco da arquivo '../dataBase/index'

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //metodo para retonar todos os status cadastrados na tabela
    async index(req, res) {
        try {
            const [results, metadata] = await Status.sequelize.query(`SELECT * FROM status ORDER BY tipo `)

            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(404).json({
                    success: false,
                    message: "Não há cadastros",
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        };
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////


    //metodo que insere um novo status na tabela
    async store(req, res) {
        try {
            // Verifique se o tipo já está cadastrado
            const statusExistente = await Status.findOne({
                where: { tipo: req.body.tipo }
            });

            if (statusExistente) {
                return res.status(400).json({
                    success: false,
                    message: "Status já está cadastrado."
                });
            }
            const [results, metadata] = await Status.sequelize.query(
                `INSERT INTO status (
                tipo,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?)`,
                {
                    replacements:
                        [
                            req.body.tipo,
                            new Date(),
                            new Date()
                        ]

                }
            )
            if (results) {
                res.status(201).json({
                    success: true,
                    message: "Status cadastrado com sucesso",
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////

    // método para deletar o status referente ao tipo informado
    async delete(req, res) {
        await Status.sequelize.query(`DELETE FROM status WHERE tipo = ?`,
            { replacements: [req.params.tipo] })
            .then(([results, metadata]) => {
                if (metadata.affectedRows === 0) {
                    res.status(404).json({
                        success: false,
                        message: "Status não encontrado",
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Status deletado com sucesso",
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