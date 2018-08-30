import {Creator} from '../../Classes/Creator';
import {Media} from '../../Classes/Media';
import {Tickets} from '../../Classes/Tickets';

export class Event {
  address: string;
  creator: Creator;
  description: string;
  endTime: number;
  eventId: string;
  eventName: string;
  eventType: string;
  eventVideo: Media;
  placeId: string;
  placeholderImage: Media;
  tickets: Tickets[];
  startTime: number;
  timeZone: string;
  university: string;
  ticketsSold: number;
  constructor(address: string, creator: Creator, description: string, endTime: number, eventId: string, eventName: string,
              eventType: string, eventVideo: Media, placeId: string, placeholderImage: Media, startTime: number, tickets: Tickets[],
              timeZone: string, university: string, ticketsSold: number) {
    this.address = address;
    this.creator = creator;
    this.description = description;
    this.endTime = endTime;
    this.eventId = eventId;
    this.eventName = eventName;
    this.eventType = eventType;
    this.eventVideo = eventVideo;
    this.placeId = placeId;
    this.placeholderImage = placeholderImage;
    this.tickets = tickets;
    this.startTime = startTime;
    this.timeZone = timeZone;
    this.university = university;
    this.ticketsSold = ticketsSold;
  }
}
