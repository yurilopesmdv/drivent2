import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { notFoundError } from '../../errors/not-found-error';
import ticketRepository, { CreateTicket } from '../../repositories/ticket-repository/index';
import enrollmentRepository from '../../repositories/enrollment-repository/index';

async function getAllTickets() {
  const tickets = await ticketRepository.findAllTickets();
  if (!tickets) throw notFoundError;
  return tickets;
}
type TicketWithType = Ticket & { TicketType: TicketType };

async function getTicketById(userId: number): Promise<TicketWithType> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError;
  const enrollmentId = enrollment.id;
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);
  if (!ticket || !ticket.TicketType) {
    throw notFoundError();
  }
  return ticket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError;
  const ticketData: CreateTicket = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };
  await ticketRepository.postTicket(ticketData);
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  return ticket;
}

const ticketService = {
  getAllTickets,
  getTicketById,
  postTicket,
};

export default ticketService;
