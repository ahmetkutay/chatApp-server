const request = require('supertest');
const app = require('../src');

describe('HTTP Tests', () => {
    it('GET / should return a successful response', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({success: true, users: []});
    });
});