import {isNullOrUndefined} from 'util';

export class Tickets {
  currency: string;
  description: string;
  maxAllowedPerOrder: number;
  minAllowedPerOrder: number;
  name: string;
  price: number;
  quantity: number;
  salesEndTime: number;
  ticketsSold: number;
  timeZone: string;
  type: string;
  visible: boolean;
  constructor(currency: string, description: string, maxAllowedPerOrder: number, minAllowedPerOrder: number, name: string, price: number,
              quantity: number, salesEndTime: number, ticketsSold: number, timeZone: string, type: string, visible: boolean) {
    this.currency = currency;
    this.description = description;
    this.maxAllowedPerOrder = maxAllowedPerOrder;
    this.minAllowedPerOrder = minAllowedPerOrder;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.salesEndTime = salesEndTime;
    this.ticketsSold = ticketsSold;
    this.timeZone = timeZone;
    this.type = type;
    this.visible = visible;
  }
  static equalTo(ticket: Tickets, other: Tickets): boolean {
    if (isNullOrUndefined(other)) {
      return false;
    }
    return ticket.currency === other.currency && ticket.name === other.name && ticket.visible === other.visible && ticket.price === other.price &&
      ticket.ticketsSold === other.ticketsSold && ticket.quantity === other.quantity;
  }


}
