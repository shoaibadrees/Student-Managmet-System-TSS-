import { TestBed } from '@angular/core/testing';

import { FeeHistoryDialogService } from './FeeHistory_Dialog.service';

describe('FeeHistoryService', () => {
  let service: FeeHistoryDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeHistoryDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
