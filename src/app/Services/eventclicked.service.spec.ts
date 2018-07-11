import { TestBed, inject } from '@angular/core/testing';

import { EventclickedService } from './eventclicked.service';

describe('EventclickedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventclickedService]
    });
  });

  it('should be created', inject([EventclickedService], (service: EventclickedService) => {
    expect(service).toBeTruthy();
  }));
});
