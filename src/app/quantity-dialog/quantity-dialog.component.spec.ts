import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityDialogComponent } from './quantity-dialog.component';

describe('QuantityDialogComponent', () => {
  let component: QuantityDialogComponent;
  let fixture: ComponentFixture<QuantityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
