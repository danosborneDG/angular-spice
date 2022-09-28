export enum Format {
  percentage = 'percentage',
  fraction = 'fraction',
}

export enum Position {
  top = 'top',
  bottom = 'bottom',
}

export interface DoughnutSettings {
  value: number;
  size?: number;
  maxValue?: number;
  topValue?: number;
  thickness?: number;
  animationDuration?: number | null;
  primaryColour?: string;
  ringColour?: string;
  labelText?: string;
  labelColour?: string;
  labelPosition?: Position;
  labelFontSize?: number;
  labelFontWeight?: string;
  valueFontSize?: number;
  valueFontWeight?: string;
  format?: Format;
}

export interface Styles {
  containerStyles?: ContainerStyles;
  circleStyles?: SVGElementStyles;
  pathStyles?: SVGElementStyles;
  textContainerStyles?: TextContainerStyles;
  valueTextStyle?: TextStyles;
  labelTextStyle?: TextStyles;
}

export interface ContainerStyles {
  width: string;
  height: string;
  position: string;
}

export interface SharedSVGElementStyles {
  fill: string;
  strokeWidth: string;
}

export interface SVGElementStyles extends SharedSVGElementStyles {
  stroke: string;
}

export interface TextContainerStyles {
  fontFamily: string;
  position: string;
  left: string;
  top: string;
  transform: string;
  textAlign: string;
}

export interface TextStyles {
  fontWeight: string;
  fontSize: string;
  color: string;
  margin: string;
}
