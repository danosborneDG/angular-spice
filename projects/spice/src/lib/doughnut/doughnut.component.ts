import { Component, Input, OnInit } from '@angular/core';
import {
  ContainerStyles,
  DoughnutSettings,
  Styles,
  SVGElementStyles,
  SVGSizes,
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
  appliedSettings: DoughnutSettings | null = null;
  styles: Styles | null = null;
  svgSizes: SVGSizes | null = null;
  containerStyles: ContainerStyles | null = null;
  circleStyles: SVGElementStyles | null = null;
  pathStyles: SVGElementStyles | null = null;
  textContainerStyles: TextContainerStyles | null = null;
  valueTextStyles: TextStyles | null = null;
  labelTextStyles: TextStyles | null = null;
  pathAttribute: string | null = null;
  viewBoxAttribute: string | null = null;
  radiusAttribute: string | null = null;

  @Input() settings: DoughnutSettings | null = null;

  constructor(private doughnutService: DoughnutService) {}

  ngOnInit(): void {
    this.appliedSettings = this.doughnutService.applySettings(this.settings);
    this.styles = this.doughnutService.generateStyles(this.appliedSettings);
    this.svgSizes = this.doughnutService.configureSvgSizes(this.appliedSettings);

    this.containerStyles = this.styles.containerStyles;
    this.circleStyles = this.styles.circleStyles;
    this.pathStyles = this.styles.pathStyles;
    this.textContainerStyles = this.styles.textContainerStyles;
    this.valueTextStyles = this.styles.valueTextStyles;
    this.labelTextStyles = this.styles.labelTextStyles;

    this.pathAttribute = this.doughnutService.calculatePathShape(
      this.appliedSettings.value, 
      this.appliedSettings.size || 200, 
      this.appliedSettings.thickness|| 15
    );

    this.viewBoxAttribute = this.svgSizes.viewbox;
    this.radiusAttribute = this.svgSizes.radius;
  }
}
