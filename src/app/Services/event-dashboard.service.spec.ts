import { TestBed, inject } from '@angular/core/testing';

import { EventDashboardService } from './event-dashboard.service';

describe('EventDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventDashboardService]
    });
  });

  it('should be created', inject([EventDashboardService], (service: EventDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
