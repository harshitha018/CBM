import { combineReducers } from "redux";
import { appReducer } from "./reducer";

export const rootReducer = combineReducers({
  data: appReducer,
});
