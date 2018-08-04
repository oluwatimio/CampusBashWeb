import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecreatorComponent } from './profilecreator.component';

describe('ProfilecreatorComponent', () => {
  let component: ProfilecreatorComponent;
  let fixture: ComponentFixture<ProfilecreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilecreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
