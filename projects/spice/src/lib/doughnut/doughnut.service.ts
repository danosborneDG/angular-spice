import { Injectable } from '@angular/core';
import { DoughnutSettings, SharedSVGElementStyles, Styles } from './doughnut.models';

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

  generateStyles(settings: DoughnutSettings): Styles {
    const size = `${settings?.size}px` || '200px';
    const sharedSvgStyles: SharedSVGElementStyles = {
      fill: 'none',
      strokeWidth: `${settings.thickness}px` || '5px',
    };

    return {
      containerStyles: {
        width: size,
        height: size,
        position: 'relative',
      },
      circleStyles: {
        stroke: settings.ringColour || '#DDD',
        ...sharedSvgStyles,
      },
      pathStyles: {
        stroke: settings.primaryColour || '#DDD',
        ...sharedSvgStyles,
      },
      textContainerStyles: {
        fontFamily: settings.fontFamily || 'inherit',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      },
      valueTextStyle: {
        fontWeight: settings.valueFontWeight || 'bold',
        fontSize: `${settings.valueFontSize}px` || '28px',
        color: settings.primaryColour || '#e7534f',
        margin: '0',
      },
      labelTextStyle: {
        fontWeight: settings.labelFontWeight || 'normal',
        fontSize: `${settings.labelFontSize}px` || '14px',
        color: settings.labelColour || '#333',
        margin: ' 0',
      },
    };
  }
}
