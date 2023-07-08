import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware';
import ticketService from '../services/tickets-service/index';

export async function getAllTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketService.getAllTickets();
    if (!tickets) return res.status(httpStatus.OK).send([]);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketService.getTicketById(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }
}
