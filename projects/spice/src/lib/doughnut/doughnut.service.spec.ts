import { TestBed } from '@angular/core/testing';

import { DoughnutService } from './doughnut.service';

describe('DoughnutService', () => {
  let service: DoughnutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoughnutService);
  });

  describe('calculatePathShape', () => {
    test('Calculates path shape correctly for a large arc', () => {
      const expectation = 'M 100 5 A 95 95 0 1 1 5.000000000144695 100.00016580627893';
      expect(service.calculatePathShape(75, 200, 5)).toBe(expectation);
    });

    test('Calculates path shape correctly for a small arc', () => {
      const expectation = 'M 100 5 A 95 95 0 0 1 176.85651700701743 44.160266892202664';
      expect(service.calculatePathShape(15, 200, 5)).toBe(expectation);
    });
  });
});
