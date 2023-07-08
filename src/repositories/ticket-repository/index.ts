import { Ticket } from '@prisma/client';
import { prisma } from '../../config/database';

async function findAllTickets() {
  return prisma.ticketType.findMany({});
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
    where: {
      enrollmentId,
    },
  });
}
export type CreateTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function postTicket(ticketData: CreateTicket) {
  return prisma.ticket.create({
    data: {
      ...ticketData,
    },
  });
}

const ticketRepository = {
  findAllTickets,
  findTicketByEnrollmentId,
  postTicket,
};

export default ticketRepository;
