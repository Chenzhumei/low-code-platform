import { TestBed } from '@angular/core/testing';

import { CurrentMaterialService } from './current-material.service';

describe('CurrentMaterialService', () => {
  let service: CurrentMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
