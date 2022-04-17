import { Action } from "../types/interfaces";

const loanInformation = (state = {}, action: Action) => {
  if (action.type === "setInformation") {
    return (state = action.payload);
  } else {
    return state;
  }
};

export default loanInformation;
