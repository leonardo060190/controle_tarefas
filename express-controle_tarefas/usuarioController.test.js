const request = require('supertest');
const app = require('./app'); // Replace with the actual path to your Express app file
const Usuario = require('./models/usuario');

describe('UserController', () => {
    beforeEach(async () => {
        await Usuario.destroy({ where: {} }); // Clear the database before each test
    });

    describe('GET /usuarios', () => {
        it('should return all usuarios', async () => {
            // Create some test data
            Usuario.create({
                nome: 'João da Silva',
                sobrenome: 'Silva',
                email: 'joao@silva.com',
                senha: '123456'
            });

            const response = await request(app).get('/usuarios');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{
                nome: 'João da Silva',
                sobrenome: 'Silva',
                email: 'joao@silva.com',
                senha: '123456'
            }]);
        });

        it('should handle no usuarios found', async () => {
            const response = await request(app).get('/usuarios');

            expect(response.status).toEqual(404);
            expect(response.body).toEqual({
                success: false,
                message: 'Não há cadastros',
            });
        });

        it('should handle errors during usuario retrieval', async () => {
            // Mock Sequelize.query to simulate an error
            jest.spyOn(Usuario.sequelize, 'query').mockRejectedValueOnce(new Error('Mocked error'));

            const response = await request(app).get('/usuarios');

            expect(response.status).toEqual(500);
            expect(response.body).toEqual({
                success: false,
                message: 'Mocked error',
            });
        });
    });

    describe('POST /usuarios', () => {
        it('should create a new usuario', async () => {
            const response = await request(app)
                .post('/usuarios')
                .send({
                    nome: 'New user',
                    sobrenome: 'New surname',
                    email: 'newuser@example.com',
                    senha: 'password'
                });

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                success: true,
                message: 'Usuário cadastrado com sucesso',
            });
        });

        it('should handle duplicate usuario creation', async () => {
            Usuario.create({
                nome: 'Existing user',
                sobrenome: 'Existing surname',
                email: 'existinguser@example.com',
                senha: 'password'
            });

            const response = await request(app)
                .post('/usuarios')
                .send({
                    nome: 'Existing user',
                    sobrenome: 'Existing surname',
                    email: 'existinguser@example.com',
                    senha: 'password'
                });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                success: false,
                message: 'Email já está cadastrado.',
            });
        });

        it('should handle errors during usuario creation', async () => {
            // Mock Sequelize.query to simulate an error
            jest.spyOn(Usuario.sequelize, 'query').mockRejectedValueOnce(new Error('Mocked error'));

            const response = await request(app)
                .post('/usuarios')
                .send({
                    nome: 'New user',
                    sobrenome: 'New surname',
                    email: 'newuser@example.com',
                    senha: 'password'
                });

            expect(response.status).toEqual(500);
            expect(response.body).toEqual({
                success: false,
                message: 'Mocked error',
            });
        });
    });

    describe('DELETE /usuarios/:email', () => {
        it('should delete an existing usuario', async () => {
            Usuario.create({
                nome: 'UsuarioToDelete',
                sobrenome: 'Silva',
                email: 'usuariotodelete@example.com',
                senha: 'password'
            });

            const response = await request(app)
                .delete('/usuarios/UsuarioToDelete');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                message: 'Usuário deletado com sucesso',
            });
        });

        it('should handle deletion of non-existing usuario', async () => {
            const response = await request(app)
                .delete('/usuarios/NonExistingUsuario');
        });
    });
});