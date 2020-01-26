import { SET_SEARCH_QUERY } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, term: action.payload };
    default:
      return state;
  }
};
