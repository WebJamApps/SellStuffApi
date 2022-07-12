/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import app from '../../../src/index';
import subscriber from '../../../src/model/subscriber/subscriber-facade';

describe('Subscriber Router', () => {
  let r: { status:number };
  const deleter:any = {};
  beforeEach(async () => {
    await subscriber.deleteMany(deleter);
  });
  afterAll(async () => {
    await subscriber.deleteMany(deleter);
  });
  it('creates a new subscriber', async () => {
    r = await request(app)
      .post('/api/subscriber/new')
      .send({ email: 'foo3@example.com' });
    expect(r.status).toBe(201);
  });
  it('returns error when email is bogus', async () => {
    r = await request(app)
      .post('/api/subscriber/new')
      .send({ email: 'bogus' });
    expect(r.status).toBe(400);
  });
});
