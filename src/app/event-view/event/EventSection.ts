import {Event} from './Event';

export class EventSection {
    sectionName: String;
    events: Event[];


  constructor(sectionName: String, events: Event[]) {
    this.sectionName = sectionName;
    this.events = events;
  }
}
