import request from 'supertest';
import app from '../../../src/index';

describe('Email Router', () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(true), 500));
  });

  let r;
  it('sends an email', async () => {
    r = await request(app)
      .post('/api/email')
      .send({ email: 'yo@yo.com' });
    expect(r.status).toBe(200);
  });
});
