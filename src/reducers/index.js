import { combineReducers } from "redux";
import appsReducer from "./appsReducer";
import categoriesReducer from "./categoriesReducer";
import selectCategoryReducer from "./selectCategoryReducer";
import paginationReducer from "./paginationReducer";
import searchQueryReducer from "./searchQueryReducer";

export default combineReducers({
  apps: appsReducer,
  categories: categoriesReducer,
  selectedCategory: selectCategoryReducer,
  pagination: paginationReducer,
  searchQuery: searchQueryReducer
});
