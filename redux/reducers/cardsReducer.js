const initialState = {
  languages: { from: "fr-FR", to: "en-US" },
  cards: [
    {
      id: 1,
      title: "fruit",
      lastUpdate: "xxx",
      createOn: "xxx",
    },
    {
      id: 2,
      title: "veget",
      lastUpdate: "xxx",
      createOn: "xxx",
    },
  ],
  cardItems: {
    fruit: [
      {
        id: 123,
        from: "pomme",
        to: "apple",
        pronouce: "xxx",
      },
      {
        id: 1234,
        from: "banane",
        to: "banana",
        pronouce: "xxx",
      },
    ],
    veget: [
      {
        id: 123,
        from: "carrotte",
        to: "carote",
        pronouce: "xxx",
      },
    ],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CARD":
      console.log(action.payload.title);
      return {
        ...state,
        cards: [...state.cards, action.payload],
        cardItems: {
          ...state.cardItems,
          [action.payload.title]: [],
        },
      };
    case "ADD_ITEM_IN_CARD":
      return {
        ...state,
        cardItems: {
          ...state.cardItems,
          [action.idCard]: [...state.cardItems[action.idCard], action.payload],
        },
      };

    default:
      return state;
  }
};
