import { Payment } from '@prisma/client';
import { prisma } from '../../config/database';

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
}

async function createPayment(ticketId: number, params: ParamsPayment) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export type CardData = {
  issuer: string;
  number: number;
  name: string;
  expirantionDate: Date;
  cvv: number;
};

export type ParamsPayment = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  findPaymentByTicketId,
  createPayment,
};

export default paymentRepository;
