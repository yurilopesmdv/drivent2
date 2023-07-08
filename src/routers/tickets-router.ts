import { Router } from 'express';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { getAllTickets, getTicket, postTicket } from '../controllers/tickets-controller';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken).get('/types', getAllTickets).get('/', getTicket).post('/', postTicket);

export { ticketRouter };
