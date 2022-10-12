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
  appliedSettings: DoughnutSettings = {} as DoughnutSettings;
  styles: Styles = {} as Styles;
  svgSizes: SVGSizes = {} as SVGSizes;
  containerStyles: ContainerStyles = {} as ContainerStyles;
  circleStyles: SVGElementStyles = {} as SVGElementStyles;
  pathStyles: SVGElementStyles = {} as SVGElementStyles;
  textContainerStyles: TextContainerStyles = {} as TextContainerStyles;
  valueTextStyles: TextStyles = {} as TextStyles;
  labelTextStyles: TextStyles = {} as TextStyles;
  pathAttribute: string = '';
  viewBoxAttribute: string = '';
  radiusAttribute: string = '';
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
          this.appliedSettings.size as number,
          this.appliedSettings.thickness as number,
        );
        this.value = this.doughnutService.formatValue({
          ...this.appliedSettings,
          ...{ value: index },
        });
      }, index * this.doughnutService.stepDuration(this.percentage, this.appliedSettings.animationDuration as number));
    }
  }

  ngOnInit(): void {
    this.appliedSettings = this.doughnutService.applySettings(
      this.settings as DoughnutSettings,
    );
    this.handleStyles(this.appliedSettings);
    this.generateDoughnut(this.appliedSettings);

    if (this.appliedSettings.animationDuration) {
      this.handleAnimation();
    }
  }
}
