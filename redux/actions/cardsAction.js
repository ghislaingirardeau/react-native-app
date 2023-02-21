export const initSettings = (payload) => {
  return {
    type: "INIT_SETTINGS",
    payload,
  };
};

export const addCard = (payload) => {
  return {
    type: "ADD_CARD",
    payload,
  };
};

export const addItemInCard = (payload, idCard) => {
  return {
    type: "ADD_ITEM_IN_CARD",
    payload,
    idCard,
  };
};

export const cleanAll = () => {
  return {
    type: "CLEAN_ALL",
  };
};
