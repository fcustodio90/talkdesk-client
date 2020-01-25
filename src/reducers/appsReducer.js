import { FETCH_APPS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_APPS:
      return action.payload;
    case "FETCH_APPS_BY_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};
