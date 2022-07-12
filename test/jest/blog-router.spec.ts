/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest';
import app from '../../src/index';
import BlogModel from '../../src/model/blog/blog-facade';
import userModel from '../../src/model/user/user-facade';
import authUtils from '../../src/auth/authUtils';

describe('The Blog API', () => {
  let r, newUser:any;
  const allowedUrl = JSON.parse(process.env.AllowUrl || '{}').urls[0];
  beforeAll(async () => {
    const query:any = {};
    await userModel.deleteMany(query);
    newUser = await userModel.create({ name: 'foo', email: 'foo3@example.com', userType: JSON.parse(process.env.AUTH_ROLES || '{}').user[0] });
  });
  beforeEach(async () => {
    const deleter:any = {};
    await BlogModel.deleteMany(deleter);
    await BlogModel.create({ title: 'Howdy', body: 'Yo Yo!' });
  });
  it('find one blog', async () => {
    await BlogModel.create({
      title: 'Best Blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .get('/api/blog/one')
      .set({
        origin: allowedUrl,
      })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`)
      .query({ type: 'paperback' });
    expect(r.status).toBe(200);
    expect(r.body.title).toBe('Best Blog Ever');
  });
  it('should not find one blog', async () => {
    await BlogModel.create({
      title: 'Best Blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .get('/api/blog/one')
      .set({
        origin: allowedUrl,
      })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: '123456' })}`)
      .query({ type: 'magazine' });
    expect(r.status).toBe(400);
  });
  it('should update one blog', async () => {
    await BlogModel.create({
      title: 'Best Blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .put('/api/blog/one')
      .set({
        origin: allowedUrl,
      })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`)
      .query({ type: 'paperback' })
      .send({ title: 'Bad Blog' });
    expect(r.status).toBe(200);
    expect(r.body.title).toBe('Bad Blog');
  });
  it('deletes a blog by id', async () => {
    const newBook = await BlogModel.create({
      title: 'Best Blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .delete(`/api/blog/${newBook._id}`)
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`);
    expect(r.status).toBe(200);
  });
  it('updates a blog by id', async () => {
    const newBook = await BlogModel.create({
      title: 'Best Blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .put(`/api/blog/${newBook.id}`)
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`)
      .send({ title: 'Bad Blog' });
    expect(r.status).toBe(200);
  });
  it('finds the blog by id', async () => {
    const newblog = await BlogModel.create({
      title: 'Best Test Blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .get(`/api/blog/${newblog._id}`)
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`);
    expect(r.status).toBe(200);
  });
  it('gets all blogs', async () => {
    await BlogModel.create({
      title: 'Best blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .get('/api/blog')
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: '123456' })}`);
    expect(r.status).toBe(200);
  });
  it('creates a new blog', async () => {
    await BlogModel.create({
      title: 'Best blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .post('/api/blog')
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`)
      .send({
        title: '2nd Best Blog Ever', type: 'Lutheran', body: 'I am the best blog ever!',
      });
    expect(r.status).toBe(201);
  });
  it('deletes many blogs', async () => {
    await BlogModel.create({
      title: 'Best Blog Ever', type: 'paperback', body: 'I am the best blog ever!',
    });
    r = await request(app)
      .delete('/api/blog')
      .set({ origin: allowedUrl })
      .set('Authorization', `Bearer ${authUtils.createJWT({ _id: newUser._id })}`)
      .query({ type: 'paperback' });
    expect(r.status).toBe(200);
  });
});
