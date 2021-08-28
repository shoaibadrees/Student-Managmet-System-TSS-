import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionHistoryDialogComponent } from './AddmissionHistory_Dialog.component';

describe('AddmissionHistoryDialogComponent', () => {
  let component: AdmissionHistoryDialogComponent;
  let fixture: ComponentFixture<AdmissionHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
