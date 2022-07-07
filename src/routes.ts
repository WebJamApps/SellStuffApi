import express, { Express } from 'express';
import user from './model/user/user-router';
import blog from './model/blog/blog-router';
import email from './model/email/email-router';
import subscriber from './model/subscriber/subscriber-router';

const router = express.Router();

export default function route(app: Express, baseUrl:string): void {
  app.use(router);
  router.use(`${baseUrl}/user`, user);
  router.use(`${baseUrl}/blog`, blog);
  router.use(`${baseUrl}/email`, email);
  router.use(`${baseUrl}/subscriber`, subscriber);
}
