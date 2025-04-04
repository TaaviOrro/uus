const request = require('supertest');
const app = require('./app');

// Tavalised route testid
describe('Basic route tests', () => {
  test('GET / peaks tagastama tervituse', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Tere');
  });

  test('GET /about peaks tagastama about-lehe teksti', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('about');
  });

  test('GET /unknown annab 404', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
  });
});

// POST route testid
describe('POST route tests', () => {
  test('POST /data kehtiva sisendiga', async () => {
    const res = await request(app)
      .post('/data')
      .send({ name: 'Taavi', age: 25 });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test('POST /data puuduvate andmetega', async () => {
    const res = await request(app)
      .post('/data')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

// Lisa utils.js testid, kui olemas
const utils = require('./utils'); // kui see fail olemas

describe('Funktsioonide testimine', () => {
  test('Funktsioon "sum" töötab õigesti', () => {
    expect(utils.sum(2, 3)).toBe(5);
  });

  test('Funktsioon "isAdult" tagastab true kui vanus >= 18', () => {
    expect(utils.isAdult(20)).toBe(true);
    expect(utils.isAdult(15)).toBe(false);
  });
});

// Errori test
describe('Error handling', () => {
  test('Kui visatakse error, siis vastus on 500', async () => {
    const res = await request(app).get('/force-error');
    expect(res.statusCode).toBe(500);
  });
});

test('Funktsioon "sum" töötab ka negatiivsete arvudega', () => {
    expect(utils.sum(-2, -3)).toBe(-5);
  });

  test('Funktsioon "isAdult" töötab täpselt piiril (18)', () => {
    expect(utils.isAdult(18)).toBe(true);
  });
  