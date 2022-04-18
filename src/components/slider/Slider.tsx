import React from "react";
import { SliderProps } from "../../types/interfaces";

const Slider: React.FC<SliderProps> = ({ amount, options, calculatorConfiguration, label, valueClasses, onChange }) => {
  return (
    <>
      <div className="form-group">
        <label>{label}</label>
        <div className="select-wrapper">
          <select value={amount} onChange={event => onChange(event)}>
            {options.map((option: number) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className={valueClasses}>{valueClasses === "amount-value" ? "$" : "days"}</p>
        </div>
      </div>
      <input
        type="range"
        value={amount}
        min={calculatorConfiguration.min}
        max={calculatorConfiguration.max}
        step={calculatorConfiguration.step}
        onChange={event => onChange(event)}
      />
      <div className="flex-group">
        <p className="m-0 medium-font">
          {valueClasses === "amount-value" ? "$" : ""}
          {calculatorConfiguration.min}
        </p>
        <p className="m-0 medium-font">
          {valueClasses === "amount-value" ? "$" : ""}
          {calculatorConfiguration.max}
        </p>
      </div>
    </>
  );
};

export default Slider;
