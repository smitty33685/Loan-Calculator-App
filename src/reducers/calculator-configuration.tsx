import { Action } from "../types/interfaces";

const calculatorConfiguration = (state = {}, action: Action) => {
  return action.type === "setConfiguration" ? (state = action.payload) : state;
};

export default calculatorConfiguration;
