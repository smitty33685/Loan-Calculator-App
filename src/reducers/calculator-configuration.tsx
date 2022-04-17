import { Action } from "../types/interfaces";

const calculatorConfiguration = (state = {}, action: Action) => {
  if (action.type === "setConfiguration") {
    return (state = action.payload);
  } else {
    return state;
  }
};

export default calculatorConfiguration;
