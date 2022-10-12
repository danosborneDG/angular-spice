export enum Format {
  percentage = 'percentage',
  fraction = 'fraction',
}

export enum Position {
  top = 'top',
  bottom = 'bottom',
}

export enum FontWeight {
  normal = 'normal',
  bold = 'bold',
  lighter = 'lighter',
  bolder = 'bolder',
  f100 = '100',
  f200 = '200',
  f300 = '300',
  f400 = '400',
  f500 = '500',
  f600 = '600',
  f700 = '700',
  f800 = '800',
  f900 = '900',
  inherit = 'inherit',
  initial = 'initial',
  revert = 'revert',
  revertLayer = 'revert-layer',
  unset = 'unset',
}

export interface DoughnutSettings {
  value: number;
  size?: number;
  maxValue?: number;
  topValue?: number;
  thickness?: number;
  animationDuration?: number | null;
  primaryColour?: string | string[];
  fontFamily?: string;
  ringColour?: string;
  labelText?: string | null;
  labelColour?: string;
  labelPosition?: Position;
  labelFontSize?: number;
  labelFontWeight?: FontWeight;
  valueFontSize?: number;
  valueFontWeight?: FontWeight;
  format?: Format;
}

export interface Styles {
  containerStyles: ContainerStyles;
  circleStyles: SVGElementStyles;
  pathStyles: SVGElementStyles;
  textContainerStyles: TextContainerStyles;
  valueTextStyles: TextStyles;
  labelTextStyles: TextStyles;
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
  stroke: string | undefined;
}

export interface TextContainerStyles {
  fontFamily: string | undefined;
  position: string;
  left: string;
  top: string;
  transform: string;
  textAlign: string;
}

export interface TextStyles {
  fontWeight: string | undefined;
  fontSize: string | undefined;
  color: string | undefined;
  margin: string;
}

export interface SVGSizes {
  viewbox: string;
  radius: string;
}
