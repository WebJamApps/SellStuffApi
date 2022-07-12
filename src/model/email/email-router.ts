import express from 'express';
import EmailController from './emailController';

const router = express.Router();

const controller = new EmailController();

router.route('/')
  .post((req, res) => controller.sendEmail(req, res));

export default router;
