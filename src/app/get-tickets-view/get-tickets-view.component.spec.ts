import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTicketsViewComponent } from './get-tickets-view.component';

describe('GetTicketsViewComponent', () => {
  let component: GetTicketsViewComponent;
  let fixture: ComponentFixture<GetTicketsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTicketsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTicketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
