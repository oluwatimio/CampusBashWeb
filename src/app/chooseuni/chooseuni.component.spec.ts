import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseuniComponent } from './chooseuni.component';

describe('ChooseuniComponent', () => {
  let component: ChooseuniComponent;
  let fixture: ComponentFixture<ChooseuniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseuniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
