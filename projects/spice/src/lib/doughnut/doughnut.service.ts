import { Injectable } from '@angular/core';
import {
  DoughnutSettings,
  FontWeight,
  Format,
  Position,
  SharedSVGElementStyles,
  Styles,
  SVGSizes,
} from './doughnut.models';

@Injectable({
  providedIn: 'root',
})
export class DoughnutService {
  calculatePathShape(percentage: number, size: number, thickness: number): string {
    const PI: number = Math.PI;
    const cos = Math.cos;
    const sin = Math.sin;
    const centerY: number = size / 2;
    const centerX: number = size / 2;
    const radius: number = size / 2 - thickness;
    const startAngle: number = -90;
    const startRadians: number = (startAngle * PI) / 180;
    const endAngle: number = percentage * 3.6 - 90;
    const endRadians: number = ((endAngle - 0.0001) * PI) / 180;
    const largeArc: number = (endRadians - startRadians) % (PI * 2) > PI ? 1 : 0;
    const startX: number = centerX + cos(startRadians) * radius;
    const startY: number = centerY + sin(startRadians) * radius;
    const endX: number = centerX + cos(endRadians) * radius;
    const endY: number = centerY + sin(endRadians) * radius;

    const attrString = [
      'M',
      startX,
      startY,
      'A',
      radius,
      radius,
      0,
      largeArc,
      1,
      endX,
      endY,
    ].join(' ');

    return String(attrString);
  }

  applySettings(overRides: DoughnutSettings): DoughnutSettings {
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

    return { ...defaults, ...overRides };
  }

  calculatePrimaryColour(value: number, settings: DoughnutSettings): string {
    if (typeof settings.primaryColour === 'string') {
      return settings.primaryColour;
    } else {
      const colours = settings.primaryColour as Array<string>;
      const colourCount = colours.length;
      const colourRange = Number(settings.maxValue) / Number(colourCount);
      const index = Math.floor(value / Number(colourRange));
      return colours[index];
    }
  }

  configureSvgSizes(settings: DoughnutSettings): SVGSizes {
    return {
      viewbox: `0 0 ${settings.size as number} ${settings.size as number}`,
      radius: String((settings.size as number) / 2 - (settings.thickness as number)),
    };
  }

  formatValue(settings: DoughnutSettings): string {
    const format = settings.format;
    let display: string;
    switch (format) {
      case Format.percentage:
        display = `${settings.value}%`;
        break;
      case Format.fraction:
        display = `${settings.value} / ${settings.maxValue}`;
        break;
      default:
        display = `${settings.value}%`;
    }

    return display;
  }

  calculatePercentage(settings: DoughnutSettings) {
    const value = settings.value;
    const maxValue = settings.maxValue as number;
    return (value / maxValue) * 100;
  }

  generateStyles(settings: DoughnutSettings): Styles {
    const size = `${settings.size}px`;
    const sharedSvgStyles: SharedSVGElementStyles = {
      fill: 'none',
      strokeWidth: `${settings.thickness}px`,
    };

    return {
      containerStyles: {
        width: size,
        height: size,
        position: 'relative',
      },
      circleStyles: {
        stroke: settings.ringColour,
        ...sharedSvgStyles,
      },
      pathStyles: {
        stroke: this.calculatePrimaryColour(settings.value, settings),
        ...sharedSvgStyles,
      },
      textContainerStyles: {
        fontFamily: settings.fontFamily,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      },
      valueTextStyles: {
        fontWeight: settings.valueFontWeight,
        fontSize: `${settings.valueFontSize}px`,
        color: this.calculatePrimaryColour(settings.value, settings),
        margin: '0',
      },
      labelTextStyles: {
        fontWeight: settings.labelFontWeight,
        fontSize: `${settings.labelFontSize}px`,
        color: '#333',
        margin: ' 0',
      },
    };
  }

  stepDuration(percentage: number, duration: number) {
    return duration / percentage;
  }
}
