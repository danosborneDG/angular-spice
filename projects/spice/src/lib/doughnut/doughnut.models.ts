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

export interface ContainerStyles {
  width: string;
  height: string;
  position: string;
}

export interface SVGElementStyles {
  fill: string;
  strokeWidth: string;
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
