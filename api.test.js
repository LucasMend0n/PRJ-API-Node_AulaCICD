const supertest = require('supertest');
const {app, server, connection} = require('./index.js'); // Importe seu aplicativo Express

describe('Teste GET /users', () => {
  it('Get deve retornar 200 em sucesso', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);
  });
});

const mockConnection = {
  query: jest.fn()
};

// Mocking request and response objects
const mockReq = {
  body: {
    name: 'Test User',
    email: 'test@example.com'
  }
};

const mockRes = {
  statusCode: 200,
  send: jest.fn()
};

describe('createUser', () => {
  it('should create a new user', () => {
    mockConnection.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { insertId: 1 });
    });

    createUser(mockConnection, mockReq, mockRes);

    expect(mockRes.statusCode).toBe(201);
    expect(mockRes.send).toHaveBeenCalledWith('Usuário criado com sucesso');
  });

  it('should handle database errors', () => {
    mockConnection.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Database error'));
    });

    createUser(mockConnection, mockReq, mockRes);

    expect(mockRes.statusCode).toBe(500);
    expect(mockRes.send).toHaveBeenCalledWith('Erro ao criar usuário');
  });
});


afterAll(()=>{
  server.close();
  connection.end();
})
