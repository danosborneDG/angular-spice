import { Component, Input, OnInit } from '@angular/core';
import {
  ContainerStyles,
  DoughnutSettings,
  Styles,
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
  thisSettings: DoughnutSettings | null = null;
  styles: Styles | null = null;
  containerStyles: ContainerStyles | null = null;
  circleStyles: SVGElementStyles | null = null;
  pathStyles: SVGElementStyles | null = null;
  textContainerStyles: TextContainerStyles | null = null;
  valueTextStyles: TextStyles | null = null;
  labelTextStyles: TextStyles | null = null;
  pathAttribute: string | null = null;
  viewBoxAttribute = '0 0 200 200';
  radiusAttribute = '85';

  @Input() settings: DoughnutSettings | null = null;

  constructor(private doughnutService: DoughnutService) {}

  ngOnInit(): void {
    this.styles = this.doughnutService.generateStyles({ value: 75 });
    this.containerStyles = this.styles.containerStyles;
    this.circleStyles = this.styles.circleStyles;
    this.pathStyles = this.styles.pathStyles;
    this.textContainerStyles = this.styles.textContainerStyles;
    this.valueTextStyles = this.styles.valueTextStyles;
    this.labelTextStyles = this.styles.labelTextStyles;
    this.pathAttribute = this.doughnutService.calculatePathShape(34, 200, 15);
  }
}
