import {TicketQuantity} from './TicketQuantity';

export interface UserTicket {
  buyerName: string;
  buyerEmail: string;
  quantity: number;
  quantities: TicketQuantity[];
  ticketPurchaseId: string;
  totalPrice: number;
}
