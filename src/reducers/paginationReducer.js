import { FETCH_TOTAL_RECORDS, SET_CURRENT_PAGE } from "../actions/types";

const INITIAL_STATE = {
  currentPage: 1,
  appsPerPage: 3,
  totalAppsRecords: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TOTAL_RECORDS:
      return { ...state, totalAppsRecords: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};
