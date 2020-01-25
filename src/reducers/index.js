import { combineReducers } from "redux";
import appsReducer from "./appsReducer";
import categoriesReducer from "./categoriesReducer";
import selectCategoryReducer from "./selectCategoryReducer";

export default combineReducers({
  apps: appsReducer,
  categories: categoriesReducer,
  selectedCategory: selectCategoryReducer
});
