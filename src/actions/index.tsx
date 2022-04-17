export const setConfiguration = (data: object) => {
  return {
    type: "setConfiguration",
    payload: data,
  };
};

export const setInformation = (data: object) => {
  return {
    type: "setInformation",
    payload: data,
  };
};
