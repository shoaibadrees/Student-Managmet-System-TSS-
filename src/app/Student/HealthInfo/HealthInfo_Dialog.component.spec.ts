import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInfoDialogComponent } from './HealthInfo_Dialog.component';

describe('KinshipInfoDialogComponent', () => {
  let component: HealthInfoDialogComponent;
  let fixture: ComponentFixture<HealthInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
