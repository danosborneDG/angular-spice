import { TestBed } from '@angular/core/testing';
import {
  DoughnutSettings,
  FontWeight,
  Format,
  Position,
  Styles,
  SVGSizes,
} from './doughnut.models';

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
      };
      const expectation = service.applySettings({ value: 0 });
      expect(expectation).toEqual(defaults);
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
      };
      const expectation = service.applySettings(overRides);
      expect(expectation).toEqual(overRides);
    });
  });

  describe('configureSvgSizes', () => {
    test('Configures svg sizes correctly when settings are defined', () => {
      const expectation: SVGSizes = {
        radius: '45',
        viewbox: '0 0 100 100',
      };

      const settings: DoughnutSettings = {
        value: 0,
        size: 100,
        thickness: 5,
      };

      expect(service.configureSvgSizes(settings)).toEqual(expectation);
    });

    test('Configures svg sizes correctly when settings are not defined', () => {
      const expectation: SVGSizes = {
        radius: '85',
        viewbox: '0 0 200 200',
      };

      const settings: DoughnutSettings = {
        value: 0,
      };

      expect(service.configureSvgSizes(settings)).toEqual(expectation);
    });
  });

  describe('formatValue', () => {
    test('Displays correct format', () => {
      const test1 = service.formatValue({
        format: Format.percentage,
        maxValue: 100,
        value: 15,
      });
      const test2 = service.formatValue({
        format: Format.fraction,
        maxValue: 20,
        value: 15,
      });
      const test3 = service.formatValue({
        format: null as unknown as Format,
        maxValue: 100,
        value: 15,
      });
      expect(test1).toEqual('15%');
      expect(test2).toEqual('15 / 20');
      expect(test1).toEqual('15%');
    });
  });

  describe('calculatePercentage', () => {
    test('Calculates percentage correctly', () => {
      const test1 = service.calculatePercentage({
        value: 60,
        maxValue: 120,
      });
      const test2 = service.calculatePercentage({
        value: 30,
        maxValue: 120,
      });
      expect(test1).toBe(50);
      expect(test2).toBe(25);
    });

    test('Calculates percentage correctly when maxValue is undefined', () => {
      const test1 = service.calculatePercentage({
        value: 70,
      });

      expect(test1).toBe(70);
    });
  });

  describe('generateStyles', () => {
    test('Generates expected styles', () => {
      const settings: DoughnutSettings = {
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
      };

      const expectedStyles: Styles = {
        circleStyles: {
          fill: 'none',
          stroke: '#DDD',
          strokeWidth: '15px',
        },
        containerStyles: {
          height: '200px',
          position: 'relative',
          width: '200px',
        },
        labelTextStyles: {
          color: '#333',
          fontSize: '14px',
          fontWeight: 'normal',
          margin: ' 0',
        },
        pathStyles: {
          fill: 'none',
          stroke: 'rgb(41, 128, 185)',
          strokeWidth: '15px',
        },
        textContainerStyles: {
          fontFamily: 'inherit',
          left: '50%',
          position: 'absolute',
          textAlign: 'center',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
        valueTextStyles: {
          color: 'rgb(41, 128, 185)',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0',
        },
      };

      const expectation = service.generateStyles(settings);
      expect(expectation).toEqual(expectedStyles);
    });
  });

  describe('stepDuration', () => {
    test('Calculates step duration correctly', () => {
      expect(service.stepDuration(50, 1000)).toBe(20);
    });
  });
});
