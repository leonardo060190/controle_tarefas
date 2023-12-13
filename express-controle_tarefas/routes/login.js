const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const sequelize = require('../config/db');

// POST Login de usuário

const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);

    try {

        const user = await Usuario.findOne({where:{email}});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
        }
        const passwordEncrypt = await bcrypt.compare(password, user.password );
        
        if (!passwordEncrypt) {

            return res.status(401).json({
                success: false,
                message: 'Senha incorreta'
            })
        }

         // Autenticação bem-sucedida
        // Aqui você pode retornar um token JWT ou os detalhes do usuário, dependendo da sua necessidade

        res.json({
            success: true,
            message: "Login bem-sucedido",
            user: { id: user.id, email: user.email }
        });

    } catch (error) {
        res.status(500).josn({
            success: false,
            massage: error.message
        });
        
    }

});

module.exports = router;