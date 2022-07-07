import type { Request, Response } from 'express';
import Debug from 'debug';

const debug = Debug('break-point-back:EmailController');

class EmailController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-useless-constructor
  constructor() {
  }

  // eslint-disable-next-line class-methods-use-this
  sendEmail(req:Request, res:Response):Response {
    debug(req.body);
    return res.status(200).json({ message: 'email sent' });
  }
}
export default EmailController;
