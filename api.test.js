const supertest = require('supertest');
const app = require('./app'); // Importe seu aplicativo Express

describe('Teste GET /users', () => {
  it('Get deve retornar 200 em sucesso', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(201);
  });
});
