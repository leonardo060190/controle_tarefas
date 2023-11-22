
//para rodar o test: npx jest --detectOpenHandles

// statusController.test.js

const request = require('supertest');
const app = require('./app'); // Replace with the actual path to your Express app file
const Status = require('./models/statu');

describe('StatusController', () => {
    beforeEach(async () => {
        await Status.destroy({ where: {} }); // Clear the database before each test
    });

    describe('GET /status', () => {
        it('should return all statuses', async () => {
            // Create some test data
             Status.create({ tipo: 'Em espera' });
             Status.create({ tipo: 'aguarde documentaçao' });

            const response = await request(app).get('/status');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                { tipo: 'Em espera' },
                { tipo: 'aguarde documentaçao' },
            ]);
        });

        it('should handle no statuses found', async () => {
            const response = await request(app).get('/status');

            expect(response.status).toEqual(404);
            expect(response.body).toEqual({
                success: false,
                message: 'Não há cadastros',
            });
        });

        it('should handle errors during status retrieval', async () => {
            // Mock Sequelize.query to simulate an error
            jest.spyOn(Status.sequelize, 'query').mockRejectedValueOnce(new Error('Mocked error'));

            const response = await request(app).get('/status');

            expect(response.status).toEqual(500);
            expect(response.body).toEqual({
                success: false,
                message: 'Mocked error',
            });
        });
    });

    describe('POST /status', () => {
        it('should create a new status', async () => {
            const response = await request(app)
                .post('/status')
                .send({ tipo: 'New type' });

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                success: true,
                message: 'Status cadastrado com sucesso',
            });
        });

        it('should handle duplicate status creation', async () => {
             Status.create({ tipo: 'Existing type' });

            const response = await request(app)
                .post('/status')
                .send({ tipo: 'Existing type' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                success: false,
                message: 'Status já está cadastrado.',
            });
        });

        it('should handle errors during status creation', async () => {
            // Mock Sequelize.query to simulate an error
            jest.spyOn(Status.sequelize, 'query').mockRejectedValueOnce(new Error('Mocked error'));

            const response = await request(app)
                .post('/status')
                .send({ tipo: 'New type' });

            expect(response.status).toEqual(500);
            expect(response.body).toEqual({
                success: false,
                message: 'Mocked error',
            });
        });
    });

    describe('DELETE /status/:tipo', () => {
        it('should delete an existing status', async () => {
             Status.create({ tipo: 'StatusToDelete' });

            const response = await request(app)
                .delete('/status/StatusToDelete');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                success: true,
                message: 'Status deletado com sucesso',
            });
        });

        it('should handle deletion of non-existing status', async () => {
            const response = await request(app)
                .delete('/status/NonExistingStatus');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                success: false
            })
        })
    })
})