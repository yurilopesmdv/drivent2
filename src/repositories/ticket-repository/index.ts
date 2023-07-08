import { Ticket, TicketStatus } from '@prisma/client';
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

async function findTicketWithTypeById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function updateTicketToPaid(tickedId: number) {
  return prisma.ticket.update({
    where: {
      id: tickedId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  findAllTickets,
  findTicketByEnrollmentId,
  postTicket,
  findTicketById,
  findTicketWithTypeById,
  updateTicketToPaid,
};

export default ticketRepository;
