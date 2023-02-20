import { createStore, combineReducers } from "redux";
import CountReducer from "./reducers/cardsReducer";

const rootReducer = combineReducers({
  flashCards: CountReducer,
});

export const store = createStore(rootReducer);
