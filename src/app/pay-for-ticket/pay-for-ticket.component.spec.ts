import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayForTicketComponent } from './pay-for-ticket.component';

describe('PayForTicketComponent', () => {
  let component: PayForTicketComponent;
  let fixture: ComponentFixture<PayForTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayForTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayForTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
