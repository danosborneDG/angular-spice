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
  percentage: number = 0;
  value: string = '';
  label: string | null | undefined = '';

  @Input() settings: DoughnutSettings | null = null;

  constructor(private doughnutService: DoughnutService) {}

  handleStyles(settings: DoughnutSettings): void {
    this.styles = this.doughnutService.generateStyles(settings);
    this.svgSizes = this.doughnutService.configureSvgSizes(settings);
    this.containerStyles = this.styles.containerStyles;
    this.circleStyles = this.styles.circleStyles;
    this.pathStyles = this.styles.pathStyles;
    this.textContainerStyles = this.styles.textContainerStyles;
    this.valueTextStyles = this.styles.valueTextStyles;
    this.labelTextStyles = this.styles.labelTextStyles;
    this.viewBoxAttribute = this.svgSizes.viewbox;
    this.radiusAttribute = this.svgSizes.radius;
    this.label = settings.labelText;
  }

  generateDoughnut(settings: DoughnutSettings): void {
    this.percentage = this.doughnutService.calculatePercentage(settings);
    this.value = this.doughnutService.formatValue(settings);
    this.pathAttribute = this.doughnutService.calculatePathShape(
      this.percentage,
      settings.size || 200,
      settings.thickness || 15,
    );
  }

  handleAnimation(): void {
    for (let index = 0; index < this.percentage + 1; index++) {
      setTimeout(() => {
        this.pathAttribute = this.doughnutService.calculatePathShape(
          index,
          this.appliedSettings?.size || 200,
          this.appliedSettings?.thickness || 15,
        );
        this.value = this.doughnutService.formatValue({
          ...this.appliedSettings,
          ...{ value: index },
        });
      }, index * this.doughnutService.stepDuration(this.percentage, this.appliedSettings?.animationDuration || 500));
    }
  }

  ngOnInit(): void {
    this.appliedSettings = this.doughnutService.applySettings(this.settings);
    this.handleStyles(this.appliedSettings);
    this.generateDoughnut(this.appliedSettings);

    if (this.appliedSettings.animationDuration) {
      this.handleAnimation();
    }
  }
}
