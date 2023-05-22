export enum SliderType {
  BASIC,
  RANGE
}

export type SliderConfig = {
  min?: number;
  max?: number;
  step?: number;
};

export type SliderResultValue = {
  value?: number;
  minValue?: number;
  maxValue?: number;
};
