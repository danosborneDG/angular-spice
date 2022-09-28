import { Injectable } from '@angular/core';

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
}
