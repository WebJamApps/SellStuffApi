/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import app from '../../../src/index';
import user from '../../../src/model/user/user-facade';
import google from '../../../src/auth/google';
import controller from '../../../src/model/user/user-controller';
import authUtils from '../../../src/auth/authUtils';

const allowedUrl = JSON.parse(process.env.AllowUrl || '{}').urls[0];

describe('User Router', () => {
  let r;
  const deleter:any = {};
  beforeEach(async () => {
    await user.deleteMany(deleter);
  });
  afterAll(async () => {
    await user.deleteMany(deleter);
  });
  it('finds a user by email', async () => {
    const newUser:any = await user.create({ name: 'foo', email: 'foo3@example.com', userType: JSON.parse(process.env.AUTH_ROLES || '{}').user[0] });
    r = await request(app)
      .post('/api/user')
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`)
      .send({ email: 'foo3@example.com' });
    expect(r.status).toBe(200);
  });  
  it('finds all users', async () => {
    await user.create({ name: 'foo', email: 'foo3@example.com', userType: JSON.parse(process.env.AUTH_ROLES || '{}').user[0] });
    r = await request(app)
      .get('/api/user');
    expect(r.status).toBe(200);
  });
  it('finds a user by id', async () => {
    const newUser:any = await user.create({ name: 'foo', email: 'foo3@example.com', userType: JSON.parse(process.env.AUTH_ROLES || '{}').user[0] });
    r = await request(app)
      .get(`/api/user/${newUser._id}`)
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`);
    expect(r.status).toBe(200);
  });
  it('updates a user', async () => {
    const newUser:any = await user.create({ name: 'foo', email: 'foo3@example.com', userType: JSON.parse(process.env.AUTH_ROLES || '{}').user[0] });
    r = await request(app)
      .put(`/api/user/${newUser._id}`)
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`)
      .send({ name: 'foobar' });
    expect(r.status).toBe(200);
  });
  it('deletes a user', async () => {
    const newUser:any = await user.create({ name: 'foo', email: 'foo3@example.com', userType: JSON.parse(process.env.AUTH_ROLES || '{}').user[0] });
    r = await request(app)
      .delete(`/api/user/${newUser.id}`)
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`);
    expect(r.body.message).toBe('User was deleted successfully');
    expect(r.status).toBe(200);
  });
  it('allows the user to login with email', async () => {
    await user.create({
      name: 'foo', email: 'foo3@example.com', password: 'lottanumbers35555', verifiedEmail: true,
    });
    r = await request(app)
      .post('/api/user/auth/login')
      .send({ email: 'foo3@example.com', password: 'lottanumbers35555' });
    expect(r.status).toBe(200);
  });
  it('authenticates with google', async () => {
    const g: any = google;
    g.authenticate = jest.fn(() => Promise.resolve({ names: [{ displayName: 'Josh' }], emailAddresses: [{ value: 'j@js.com' }] }));
    r = await request(app)
      .post('/api/user/auth/google')
      .set({ origin: allowedUrl })
      .send({ });
    expect(r.status).toBe(201);
  });
  it('catches a error on create new user after google authenticate', async () => {
    const g: any = google;
    g.authenticate = jest.fn(() => Promise.resolve({ emailAddresses: [{ value: 'jb@yo.com' }], names: [{ displayName: 'jb' }] }));
    controller.model.findOneAndUpdate = jest.fn(() => Promise.resolve());
    const resStub = { status: () => ({ json: () => Promise.resolve(false) }) };
    controller.model.findOne = jest.fn(() => Promise.resolve({}));
    controller.model.create = jest.fn(() => Promise.reject(new Error('bad')));
    const result = await controller.google({ body: { email: 'yo@yo.com' } }, resStub);
    expect(result).toBe(false);
  });
});
