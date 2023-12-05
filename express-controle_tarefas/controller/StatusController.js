const Status = require('../models/statu')//Importa o arquivo status da pasta Models
const sequelize = require('../dataBase/index');// Importa as configurações do banco da arquivo '../dataBase/index'

module.exports = {
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //metodo para retonar todos os status cadastrados na tabela
    async index(req, res) {
        try {
            
            const [results] = await Status.sequelize.query(`SELECT id, tipo FROM status ORDER BY tipo `)
            
            if (results.length > 0) {
                return res.status(200).json(results);
                

            } else {
               return res.status(404).json({
                    success: false,
                    message: "Não há cadastros",
                });
            }
        } catch (error) {
            return res.status(500).json({
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
        try {
            await Status.sequelize.query(`DELETE FROM status WHERE tipo = ?`,
                { replacements: [req.params.tipo] });

            if (results, metadata) {
                if (metadata.affectedRows === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Status não encontrado",
                    });
                } else {
                    return res.json({
                        success: true,
                        message: "Status deletado com sucesso",
                    });
                }
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Erro ao deletar status",
            });
        }
    }




};//fim do export