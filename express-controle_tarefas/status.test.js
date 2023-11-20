const Status = require('./models/statu');
const sequelize = require('./dataBase/index');

describe('StatusController', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('should return an array of status', async () => {
        // Simulate existing status objects
        const status1 = { id: 1, tipo: 'Em andamento' };
        const status2 = { id: 2, tipo: 'Concluído' };

        // Mock the Status model's findAndCountAll method using sequelize
        jest.spyOn(Status, 'findAndCountAll').mockResolvedValue({
            count: 2,
            rows: [status1, status2],
        });

        // Import and call the StatusController's index method
        const controller = require('./controller/StatusController');
        const response = await controller.index();

        // Verify the response status code and body
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([status1, status2]);
    });

    it('should return 404 if there are no status records', async () => {
        // Mock empty results for findAndCountAll using sequelize
        jest.spyOn(Status, 'findAndCountAll').mockResolvedValue({
            count: 0,
            rows: [],
        });

        // Import and call the StatusController's index method
        const controller = require('./controller/StatusController');
        const response = await controller.index();

        // Verify the response status code and error message
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            success: false,
            message: 'Não há cadastros',
        });
    });
});
