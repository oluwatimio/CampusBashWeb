import { TestBed, inject } from '@angular/core/testing';

import { SigninemitterService } from './signinemitter.service';

describe('SigninemitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigninemitterService]
    });
  });

  it('should be created', inject([SigninemitterService], (service: SigninemitterService) => {
    expect(service).toBeTruthy();
  }));
});
