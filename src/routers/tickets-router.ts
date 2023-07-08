import { Router } from 'express';
import { authenticateToken } from '../middlewares/authentication-middleware';
import { getAllTickets, getTicket, postTicket } from '../controllers/tickets-controller';

const ticketRouter = Router();

ticketRouter.use(authenticateToken);
ticketRouter.get('/types', getAllTickets);
ticketRouter.get('/', getTicket);
ticketRouter.post('/', postTicket);
export { ticketRouter };
