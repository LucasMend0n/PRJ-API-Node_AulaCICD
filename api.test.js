const supertest = require('supertest');
const {app, server, connection} = require('./index.js'); // Importe seu aplicativo Express

describe('Teste GET /users', () => {
  it('Get deve retornar 200 em sucesso', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);
  });
});

describe('Teste POST/user', ()=>{
  it('post bem sucedido deve retornar 201', async () => {
    const response = await supertest(app).post('/users').send({name: "joaozinho comedor", email: "joaozinho@gmail.com"})
    expect(response.statusCode).toBe(201);
  });
})


afterAll(()=>{
  server.close();
  connection.end();
})
