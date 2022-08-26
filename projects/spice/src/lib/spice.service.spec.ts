import { TestBed } from '@angular/core/testing';

import { SpiceService } from './spice.service';

describe('SpiceService', () => {
  let service: SpiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
