import { TestBed, inject } from '@angular/core/testing';

import { AddeventService } from './addevent.service';

describe('AddeventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddeventService]
    });
  });

  it('should be created', inject([AddeventService], (service: AddeventService) => {
    expect(service).toBeTruthy();
  }));
});
