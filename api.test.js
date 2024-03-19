const supertest = require('supertest');
const {app, server, connection} = require('./index.js'); // Importe seu aplicativo Express

describe('Teste GET /users', () => {
  it('Get deve retornar 200 em sucesso', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    
    response.body.forEach(element => {
        expect(element).toHaveProperty("name");
        expect(element).toHaveProperty("email");
    });

  });
});

describe('Teste POST/user', ()=>{
  it('post bem sucedido deve retornar 201', async () => {
    const response = await supertest(app).post('/users').send({name: "joaozinho comedor", email: "joaozinho@gmail.com"})
    expect(response.statusCode).toBe(201);
    
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBeGreaterThan(0);

  });
})

describe('Teste delete /user/id', ()=>{
  it('Delete bem sucedido deve retornar 204', async () => {
    
    const inserted = await supertest(app).post('/users').send({name: "teste testado ", email: "teste@gmail.com"}); 

    const response = await supertest(app).delete(`/users/${inserted.body.id}`)
    expect(response.statusCode).toBe(204);
  });
})

describe('Teste put /user/id', ()=>{
  it('PUT bem sucedido deve retornar 204', async () => {

    const inserted = await supertest(app).post('/users').send({name: "teste testado ", email: "teste@gmail.com"}); 

    const response = await supertest(app).put(`/users/${inserted.body.id}`).send({name: "teste analitico", email: "testeConsiglog@gmail.com"})

    await supertest(app).delete(`/users/${inserted.body.id}`); 

    expect(response.statusCode).toBe(204);
  });
});



afterAll(()=>{
  server.close();
  connection.end();
})
