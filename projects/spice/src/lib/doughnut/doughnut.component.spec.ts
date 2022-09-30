import { fakeAsync, tick } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { DoughnutComponent } from './doughnut.component';
import {
  DoughnutSettings,
  FontWeight,
  Format,
  Position,
  Styles,
} from './doughnut.models';
import { DoughnutService } from './doughnut.service';

describe('AppComponent', () => {
  let component: DoughnutComponent;
  let service: DoughnutService;

  beforeEach(() => {
    service = new DoughnutService();
    component = new DoughnutComponent(service);
  });

  it('should render Welcome', async () => {
    await render(DoughnutComponent);
  });

  test('ngOnInit', () => {
    jest.spyOn(component, 'handleStyles');
    jest.spyOn(component, 'generateDoughnut');

    component.settings = {
      value: 0,
      labelText: 'Hello world!',
    } as DoughnutSettings;

    const expectedSettings: DoughnutSettings = {
      animationDuration: null,
      fontFamily: 'inherit',
      format: Format.percentage,
      labelColour: '#333',
      labelFontSize: 14,
      labelFontWeight: FontWeight.normal,
      labelPosition: Position.bottom,
      labelText: 'Hello world!',
      maxValue: 100,
      primaryColour: 'rgb(41, 128, 185)',
      ringColour: '#DDD',
      size: 200,
      thickness: 15,
      topValue: 100,
      value: 0,
      valueFontSize: 28,
      valueFontWeight: FontWeight.bold,
    };

    component.ngOnInit();
    expect(component.handleStyles).toHaveBeenCalledWith(expectedSettings);
    expect(component.generateDoughnut).toBeCalledWith(expectedSettings);
  });

  test('generateDoughnut', () => {
    const settings: DoughnutSettings = {
      value: 75,
      labelText: 'hello world!',
      maxValue: 100,
    };
    component.generateDoughnut(settings);

    expect(component.percentage).toBe(75);
    expect(component.value).toBe('75%');
    expect(component.pathAttribute).toBe(
      'M 100 15 A 85 85 0 1 1 15.00000000012946 100.00014835298641',
    );
  });

  test('handleStyles', () => {
    const settings: DoughnutSettings = {
      animationDuration: null,
      fontFamily: 'inherit',
      format: Format.percentage,
      labelColour: '#333',
      labelFontSize: 14,
      labelFontWeight: FontWeight.normal,
      labelPosition: Position.bottom,
      labelText: 'Hello world!',
      maxValue: 100,
      primaryColour: 'rgb(41, 128, 185)',
      ringColour: '#DDD',
      size: 200,
      thickness: 15,
      topValue: 100,
      value: 0,
      valueFontSize: 28,
      valueFontWeight: FontWeight.bold,
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

    component.handleStyles(settings);

    expect(component.styles).toEqual(expectedStyles);
    expect(component.containerStyles).toEqual(expectedStyles.containerStyles);
    expect(component.circleStyles).toEqual(expectedStyles.circleStyles);
    expect(component.pathStyles).toEqual(expectedStyles.pathStyles);
    expect(component.textContainerStyles).toEqual(expectedStyles.textContainerStyles);
    expect(component.valueTextStyles).toEqual(expectedStyles.valueTextStyles);
    expect(component.labelTextStyles).toEqual(expectedStyles.labelTextStyles);
    expect(component.viewBoxAttribute).toEqual('0 0 200 200');
    expect(component.radiusAttribute).toEqual('85');
    expect(component.label).toEqual('Hello world!');
  });

  describe('handleAnimation', () => {
    it('should not call handle animation when animationDuration is undefined', () => {
      jest.spyOn(component, 'handleAnimation');
      component.ngOnInit();
      expect(component.handleAnimation).not.toHaveBeenCalled();
    });

    it('should call handle animation when animationDuration is defined', () => {
      jest.spyOn(component, 'handleAnimation');
      component.settings = {
        value: 100,
        animationDuration: 300,
      };
      component.ngOnInit();
      expect(component.handleAnimation).toHaveBeenCalled();
    });

    it('should handle animation as expected', fakeAsync(() => {
      jest.spyOn(service, 'calculatePathShape');
      jest.spyOn(service, 'formatValue');
      jest.spyOn(service, 'stepDuration');

      component.settings = {
        value: 1,
        animationDuration: 300,
      };
      component.ngOnInit();

      tick(300);

      expect(service.calculatePathShape).toHaveBeenCalledWith(1, 200, 15);
      expect(service.formatValue).toHaveBeenCalledWith({
        animationDuration: 300,
        fontFamily: 'inherit',
        format: 'percentage',
        labelColour: '#333',
        labelFontSize: 14,
        labelFontWeight: 'normal',
        labelPosition: 'bottom',
        labelText: null,
        maxValue: 100,
        primaryColour: 'rgb(41, 128, 185)',
        ringColour: '#DDD',
        size: 200,
        thickness: 15,
        topValue: 100,
        value: 1,
        valueFontSize: 28,
        valueFontWeight: 'bold',
      });
      expect(service.stepDuration).toHaveBeenCalled();
    }));
  });
});
