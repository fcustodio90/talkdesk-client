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

export const fetchCategories = apps => {
  const categories = [...new Set(apps.flatMap(app => app.categories))].sort();

  return { type: FETCH_CATEGORIES, payload: categories };
};

export const selectCategory = category => {
  return { type: SELECT_CATEGORY, payload: category };
};

export const fetchTotalRecords = totalRecords => {
  return { type: "FETCH_TOTAL_RECORDS", payload: totalRecords };
};

export const setCurrentPage = currentPage => {
  return { type: "SET_CURRENT_PAGE", payload: currentPage };
};
