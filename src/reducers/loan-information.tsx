import { Action } from "../types/interfaces";

const loanInformation = (state = {}, action: Action) => {
  return action.type === "setInformation" ? (state = action.payload) : state;
};

export default loanInformation;
