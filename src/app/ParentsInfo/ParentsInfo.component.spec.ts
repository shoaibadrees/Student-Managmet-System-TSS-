import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsInfoComponent } from './ParentsInfo.component';

describe('DepartmentsComponent', () => {
  let component: ParentsInfoComponent;
  let fixture: ComponentFixture<ParentsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
