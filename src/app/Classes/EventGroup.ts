export class EventGroup {
  eventType: string;
  idList: string[];
  constructor(eventType: string, idList: string[]) {
    this.eventType = eventType;
    this.idList = idList;
  }
}
