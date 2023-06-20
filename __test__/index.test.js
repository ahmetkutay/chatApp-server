const request = require('supertest');
const app = require('../src/index');

describe('HTTP Tests', () => {
    let server;

    beforeAll(() => {
        server = app.listen(8080); // Start the server before running the tests
    });

    afterAll((done) => {
        server.close(done); // Close the server connection after all tests have finished
    });

    it('GET / should return a successful response', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, users: [] });
    });
});
