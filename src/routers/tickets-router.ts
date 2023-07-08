import { Router } from 'express';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { getAllTickets, getTicket } from '../controllers/tickets-controller';

const ticketRouter = Router();

ticketRouter.use(authenticateToken).get('/types', getAllTickets).get('/', authenticateToken, getTicket).post('/');

export { ticketRouter };
