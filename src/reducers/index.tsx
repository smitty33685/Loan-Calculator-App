import { combineReducers } from "redux";
import calculatorConfiguration from "./calculator-configuration";
import loanInformation from "./loan-information";

const allReducers = combineReducers({ calculatorConfiguration, loanInformation });

export default allReducers;
