export const addCard = (payload) => {
  return {
    type: "ADD_CARD",
    payload,
  };
};

export const selectCard = () => {
  return {
    type: "SELECT_CARD",
  };
};

export const addItemInCard = (payload, idCard) => {
  return {
    type: "ADD_ITEM_IN_CARD",
    payload,
    idCard,
  };
};
