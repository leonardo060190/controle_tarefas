
//para rodar o test: npx jest --detectOpenHandles

const request = require('supertest');
const app = require('./routes/Status'); // Replace with the actual path to your Express app file
const { Status } = require('./models/statu');
const  sequelize  = require('sequelize');

const db = require('./dataBase/index');

describe('StatusController', () => {
    // beforeAll(async () => {
    //     // Drop the table if it exists
    //     await sequelize.drop();
    //     // Sync the database
    //     await sequelize.sync();
    // });


    }),
    beforeEach(async () => {
        await Status?.destroy({ where: {} });
    }),

    afterEach(() => {
        jest.clearAllTimers();
    }),

    afterAll(async () => {
        await db.close();
    }),

    describe('GET /status', () => {
        it('should return all statuses', async () => {
            // Assuming you have some statuses already in the database
            const existingStatuses = [
                { tipo: 'Em andamento' },
                { tipo: 'Concluído' }
                // Add more if needed
            ];

            await Status.bulkCreate(existingStatuses);

            const response = await request(app).get('/status');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(existingStatuses);
        });

        it('should handle no statuses found', async () => {
            const response = await request(app).get('/status');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                success: false,
                message: 'Não há cadastros',
            });
        });

        it('should handle errors during status retrieval', async () => {
            // Mock Sequelize.query to simulate an error
            jest.spyOn(Status.sequelize, 'query').mockRejectedValueOnce(new Error('Mocked error'));

            const response = await request(app).get('/status');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                success: false,
                message: 'Mocked error',
            });
        });
    }),


    describe('POST /status', () => {
    it('should create a new status', async () => {
        const response = await request(app)
            .post('/status')
            .send({ tipo: 'NewStatusType' });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Status cadastrado com sucesso');
    });

    it('should handle duplicate status creation', async () => {
        // Create a status first
        await Status.create({ tipo: 'ExistingStatusType' });

        // Attempt to create the same status again
        const response = await request(app)
            .post('/status')
            .send({ tipo: 'ExistingStatusType' });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Status já está cadastrado.');
    });

    it('should handle errors during status creation', async () => {
        // Mock Sequelize.query to simulate an error
        jest.spyOn(Status.sequelize, 'query').mockRejectedValueOnce(new Error('Mocked error'));

        const response = await request(app)
            .post('/status')
            .send({ tipo: 'NewStatusType' });

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Mocked error');
    });
}),

describe('DELETE /status/:tipo', () => {
    it('should delete an existing status', async () => {
        // Create a status first
        await Status.create({ tipo: 'StatusToDelete' });

        const response = await request(app)
            .delete('/status/StatusToDelete');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Status deletado com sucesso');
    });

    it('should handle deletion of non-existing status', async () => {
        const response = await request(app)
            .delete('/status/NonExistingStatus');

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Status não encontrado');
    });

    it('should handle errors during status deletion', async () => {
        // Mock Sequelize.query to simulate an error
        jest.spyOn(Status.sequelize, 'query').mockRejectedValueOnce(new Error('Mocked error'));

        const response = await request(app)
            .delete('/status/StatusToDelete');

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Mocked error');
    });
})
