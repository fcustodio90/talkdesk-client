import { SELECT_CATEGORY } from "../actions/types";

const INITIAL_STATE = {
  name: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
