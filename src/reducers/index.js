import { combineReducers } from "redux";
import appsReducer from "./appsReducer";
import categoriesReducer from "./categoriesReducer";

export default combineReducers({
  apps: appsReducer,
  categories: categoriesReducer
});
