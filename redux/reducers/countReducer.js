// redux/reducers/countReducer.js
const initialState = {
  count: { id: 1, name: "pete", myList: [] },
  languages: { from: "fr", to: "en" },
  cards: [
    {
      id: 1,
      title: "fruit",
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
  console.log(state.count);
  switch (action.type) {
    case "COUNT_INCRESE":
      return {
        ...state,
        count: {
          ...state.count,
          myList: [...state.count.myList, action.array],
        },
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
