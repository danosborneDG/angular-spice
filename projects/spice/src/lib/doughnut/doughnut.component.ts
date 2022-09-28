import { Component, OnInit } from '@angular/core';
import {
  ContainerStyles,
  SVGElementStyles,
  TextContainerStyles,
  TextStyles,
} from './doughnut.models';
import { DoughnutService } from './doughnut.service';

@Component({
  selector: 'spice-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss'],
})
export class DoughnutComponent implements OnInit {
  constructor(private doughnutService: DoughnutService) {}

  containerStyles: ContainerStyles = {
    width: ' 200px',
    height: '200px',
    position: 'relative',
  };

  circleStyles: SVGElementStyles = {
    fill: 'none',
    strokeWidth: '15px',
    stroke: 'rgb(221, 221, 221)',
  };

  pathStyles: SVGElementStyles = {
    fill: 'none',
    strokeWidth: '15px',
    stroke: 'rgb(41, 128, 185)',
  };

  textContainerStyles: TextContainerStyles = {
    fontFamily: 'inherit',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  };

  valueTextStyles: TextStyles = {
    fontWeight: 'bold',
    fontSize: '28px',
    color: 'rgb(41, 128, 185)',
    margin: '0px',
  };

  labelTextStyles: TextStyles = {
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'rgb(51, 51, 51)',
    margin: '0px',
  };

  pathAttribute: string | null = null;
  viewBoxAttribute = '0 0 200 200';
  radiusAttribute = '85';

  ngOnInit(): void {
    this.pathAttribute = this.doughnutService.calculatePathShape(34, 200, 15);
  }
}
