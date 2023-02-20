// redux/actions/countAction.js
export const increment = (array) => {
  return {
    type: "COUNT_INCRESE",
    array,
  };
};

export const decrement = () => {
  return {
    type: "COUNT_DECRESE",
  };
};
