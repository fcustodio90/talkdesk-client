import { SET_SEARCH_QUERY } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, string: action.payload };
    default:
      return state;
  }
};
