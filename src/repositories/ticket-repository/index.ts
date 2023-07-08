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

const ticketRepository = {
  findAllTickets,
  findTicketByEnrollmentId,
};

export default ticketRepository;
