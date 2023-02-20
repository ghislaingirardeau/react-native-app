// redux/reducers/countReducer.js
const initialState = {
  count: { id: 1, name: "pete", myList: [] },
  languages: { from: "fr", to: "en" },
  cards: [
    {
      id: 1,
      title: "fruit store",
      lastUpdate: "xxx",
      createOn: "xxx",
    },
    {
      id: 2,
      title: "Veget store",
      lastUpdate: "xxx",
      createOn: "xxx",
    },
  ],
  cardItems: [
    {
      id_card: 1,
      items: [
        {
          id: "132",
          from: "pomme",
          to: "apple",
          pronouce: "xxx",
        },
      ],
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case "COUNT_DECRESE":
      console.log(state.count);
      return {
        ...state,
        count: {
          ...state.count,
          myList: state.count.myList.filter((e) => e.key === 2),
        },
      };
    default:
      return state;
  }
};
