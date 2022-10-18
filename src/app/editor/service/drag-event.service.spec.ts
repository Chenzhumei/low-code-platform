import { TestBed } from '@angular/core/testing';

import { DragEventService } from './drag-event.service';

describe('DragEventService', () => {
  let service: DragEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
