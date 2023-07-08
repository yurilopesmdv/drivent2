import { notFoundError } from '../../errors/not-found-error';
import enrollmentRepository from '../../repositories/enrollment-repository/index';
import paymentRepository, { CardData, ParamsPayment } from '../../repositories/payment-repository/index';
import ticketRepository from '../../repositories/ticket-repository/index';
import { unauthorizedError } from '../../errors/unauthorized-error';

async function findPaymentByTicketId(userId: number, ticketId: number) {
  await compareId(userId, ticketId);
  const payment = await paymentRepository.findPaymentByTicketId(ticketId);
  if (!payment) throw notFoundError();
  return payment;
}

async function compareId(userId: number, ticketId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();
  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  if (enrollment.userId !== userId) throw unauthorizedError();
}

async function createPayment(ticketId: number, userId: number, cardData: CardData) {
  await compareId(userId, ticketId);
  const ticket = await ticketRepository.findTicketWithTypeById(ticketId);
  if (!ticket) throw notFoundError();
  const params: ParamsPayment = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };
  const payment = await paymentRepository.createPayment(ticketId, params);
  await ticketRepository.updateTicketToPaid(ticketId);
  return payment;
}

const paymentService = {
  findPaymentByTicketId,
  createPayment,
};

export default paymentService;
