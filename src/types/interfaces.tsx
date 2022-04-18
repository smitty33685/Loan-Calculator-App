export interface Action {
  type: string;
  payload?: any;
}
export interface SliderProps {
  amount: number;
  options: any[];
  label: string;
  valueClasses: string;
  calculatorConfiguration: any;
  onChange: (event: any) => void;
}
export interface LoaderProps {
  text: string;
}
export interface ErrorProps {
  text: string;
}
