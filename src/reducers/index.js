import { combineReducers } from "redux";
import appsReducer from "./appsReducer";
import categoriesReducer from "./categoriesReducer";
import selectCategoryReducer from "./selectCategoryReducer";
import paginationReducer from "./paginationReducer";

export default combineReducers({
  apps: appsReducer,
  categories: categoriesReducer,
  selectedCategory: selectCategoryReducer,
  pagination: paginationReducer
});
