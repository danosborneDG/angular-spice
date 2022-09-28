import { TestBed } from '@angular/core/testing';
import { DoughnutSettings, FontWeight, Format, Position, SVGSizes } from './doughnut.models';

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

  describe('applySettings', () => {
    test('Returns default settings', () => {
      const defaults: DoughnutSettings = {
        value: 0,
        size: 200,
        maxValue: 100,
        topValue: 100,
        thickness: 15,
        animationDuration: null,
        primaryColour: 'rgb(41, 128, 185)',
        fontFamily: 'inherit',
        ringColour: '#DDD',
        labelText: null,
        labelColour: '#333',
        labelPosition: Position.bottom,
        labelFontSize: 14,
        labelFontWeight: FontWeight.normal,
        valueFontSize: 28,
        valueFontWeight: FontWeight.bold,
        format: Format.percentage,
      }
      const expectation = service.applySettings({value: 0});
      expect(expectation).toEqual(defaults)
    });

    test('Returns overRidden settings', () => {
      const overRides: DoughnutSettings = {
        value: 0,
        size: 100,
        maxValue: 300,
        topValue: 300,
        thickness: 5,
        animationDuration: 300,
        primaryColour: '#DDD',
        fontFamily: 'times new roman',
        ringColour: 'rgb(45, 128, 185)',
        labelText: 'Hi bob',
        labelColour: '#444',
        labelPosition: Position.top,
        labelFontSize: 23,
        labelFontWeight: FontWeight.bold,
        valueFontSize: 25,
        valueFontWeight: FontWeight.normal,
        format: Format.fraction,
      }
      const expectation = service.applySettings(overRides);
      expect(expectation).toEqual(overRides)
    });
  });

  describe('configureSvgSizes', () => {



    test('Configures svg sizes correctly', () => {
      const expectation: SVGSizes = {
        radius: '85',
        viewbox: '0 0 200 200'
      }

      const settings: DoughnutSettings = {
        value: 0,
        size: 200,
        thickness: 15
      }

      expect(service.configureSvgSizes(settings)).toEqual(expectation);
    });

  });
});
