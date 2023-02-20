// redux/actions/countAction.js
export const addCard = (payload) => {
  return {
    type: "ADD_CARD",
    payload,
  };
};

export const decrement = () => {
  return {
    type: "COUNT_DECRESE",
  };
};
