import { Router } from 'express';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { createPayment, getPaymentByTicketId } from '../controllers/payments-controller ';

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get('/', getPaymentByTicketId);
paymentsRouter.post('/process', createPayment);
export { paymentsRouter };
