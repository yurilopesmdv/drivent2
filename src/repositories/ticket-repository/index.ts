import { prisma } from '../../config/database';

async function findAllTickets() {
  return prisma.ticketType.findMany({});
}

async function findTicketById(userId: number) {
  return prisma.ticket.findUnique({
    include: {
      TicketType: true,
    },
    where: {
      id: userId,
    },
  });
}

const ticketRepository = {
  findAllTickets,
  findTicketById,
};

export default ticketRepository;
