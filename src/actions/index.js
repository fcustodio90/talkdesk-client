import {
  FETCH_APPS,
  FETCH_CATEGORIES,
  FETCH_APPS_BY_CATEGORY,
  SELECT_CATEGORY
} from "./types";

import talkdeskApi from "../apis/talkdeskApi";

export const fetchApps = () => async dispatch => {
  const response = await talkdeskApi.get("/apps");

  let subscriptionPriceByApp = {};

  response.data.map(x => {
    let sum = 0;
    x.subscriptions.map(y => {
      sum += y.price;
      subscriptionPriceByApp[x.id] = sum;
    });
  });

  const sortedAppsById = Object.keys(subscriptionPriceByApp).sort(function(
    a,
    b
  ) {
    return subscriptionPriceByApp[b] - subscriptionPriceByApp[a];
  });

  const sortedResponse = response.data.sort(function(a, b) {
    return sortedAppsById.indexOf(a.id) - sortedAppsById.indexOf(b.id);
  });

  dispatch({ type: FETCH_APPS, payload: sortedResponse });
};

export const fetchCategories = () => async (dispatch, getState) => {
  await dispatch(fetchApps());

  const categories = [
    ...new Set(getState().apps.flatMap(app => app.categories))
  ].sort();

  dispatch({ type: FETCH_CATEGORIES, payload: categories });
};

export const selectCategory = category => {
  return { type: SELECT_CATEGORY, payload: category };
};

export const fetchAppsByCategory = selectedCategory => async (
  dispatch,
  getState
) => {
  await dispatch(fetchApps());

  let filteredResponse = [];

  getState().apps.map(app => {
    if (app.categories.find(a => a === selectedCategory)) {
      return filteredResponse.push(app);
    }
  });

  dispatch({ type: FETCH_APPS_BY_CATEGORY, payload: filteredResponse });
};
