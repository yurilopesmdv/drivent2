import { Ticket, TicketType } from '@prisma/client';
import { notFoundError } from '../../errors/not-found-error';
import ticketRepository from '../../repositories/ticket-repository/index';

async function getAllTickets(): Promise<TicketType[]> {
  const tickets = await ticketRepository.findAllTickets();
  return tickets;
}
type TicketWithType = Ticket & { TicketType: TicketType };

async function getTicketById(userId: number): Promise<TicketWithType | null> {
  const ticket = await ticketRepository.findTicketById(userId);
  if (!ticket || !ticket.TicketType) {
    throw notFoundError();
  }
  return ticket;
}

const ticketService = {
  getAllTickets,
  getTicketById,
};

export default ticketService;
