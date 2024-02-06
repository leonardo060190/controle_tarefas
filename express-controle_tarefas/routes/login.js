const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const sequelize = require('../config/db');

// POST Login de usuário

const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha);

    try {

        const user = await Usuario.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
        }
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        console.log(passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Senha incorreta",
            });
        }

        // Autenticação bem-sucedida
        // Aqui você pode retornar um token JWT ou os detalhes do usuário, dependendo da sua necessidade
        res.json({
            success: true,
            message: "Login bem-sucedido",
            user: { id: user.id, username: user.nome, email: user.email }
            
        });
       

    } catch (error) {
        res.status(500).json({
            success: false,
            massage: error.message
        });

    }

});

module.exports = router;