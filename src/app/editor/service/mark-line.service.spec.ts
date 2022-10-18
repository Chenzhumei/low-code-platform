import { TestBed } from '@angular/core/testing';

import { MarkLineService } from './mark-line.service';

describe('MarkLineService', () => {
  let service: MarkLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
