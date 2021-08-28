import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeHistoryDialogComponent } from './FeeHistory_Dialog.component';

describe('AcademicHistoryDialogComponent', () => {
  let component: FeeHistoryDialogComponent;
  let fixture: ComponentFixture<FeeHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
