import { TestBed, inject } from '@angular/core/testing';

import { EventfilteringService } from './eventfiltering.service';

describe('EventfilteringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventfilteringService]
    });
  });

  it('should be created', inject([EventfilteringService], (service: EventfilteringService) => {
    expect(service).toBeTruthy();
  }));
});
