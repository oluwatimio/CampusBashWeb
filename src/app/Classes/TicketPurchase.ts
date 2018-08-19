import {Media} from './Media';
import {TicketMetaData} from './TicketMetaData';

export interface TicketPurchase {
  buyerId: string;
  currency: string;
  eventId: string;
  eventName: string;
  eventTime: number;
  placeholderImage: Media;
  ticketCodes: TicketMetaData[];
  ticketId: string;
  timeSpent: number;
}
