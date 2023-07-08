import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.get('/payments?ticketId=1');
paymentRouter.post('/payments/process');

export { paymentRouter };
