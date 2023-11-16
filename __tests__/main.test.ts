import { app } from '../src/index.js';
import request from 'supertest';

describe('check simple route', () => {
  it("should return 'test'", async () => {
    const res = await request(app).get('/');
    expect(res.body).toBe('test');
  });
});
describe('GET employee', () => {
  it('return 200 is employee exists', async () => {
    const employeeId = 1;
    const res = await request(app).get(`/api/data/employees/${employeeId}`);
    expect(res.body).toBe(200);
  });
});
