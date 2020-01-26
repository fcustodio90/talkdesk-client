import {
  FETCH_APPS,
  FETCH_CATEGORIES,
  SELECT_CATEGORY,
  FETCH_TOTAL_RECORDS,
  SET_CURRENT_PAGE
} from "./types";

import talkdeskApi from "../apis/talkdeskApi";

export const fetchApps = () => async dispatch => {
  const response = await talkdeskApi.get("/apps");

  // this will build an object with key value pairs
  // { id: FILL_IN, price: FILL_IN,id: FILL_IN, price: FILL_IN, etc.. }

  let subscriptionPriceByApp = {};

  // iterates the response
  response.data.forEach(x => {
    // sets a sum counter
    let sum = 0;
    x.subscriptions.forEach(y => {
      // for each subscription
      // sums the price
      // and adds it to the subscriptionPriceByApp object
      sum += y.price;
      subscriptionPriceByApp[x.id] = sum;
    });
  });

  // graps the previous object and returns a new array of app Ids only sorted
  // by the sum of subscription price in descending order
  const sortedAppsById = Object.keys(subscriptionPriceByApp).sort(function(
    a,
    b
  ) {
    return subscriptionPriceByApp[b] - subscriptionPriceByApp[a];
  });

  // matches the response with the array of ids sorted by subscription sum prices
  // and orders it accordingly
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
  return { type: FETCH_TOTAL_RECORDS, payload: totalRecords };
};

export const setCurrentPage = currentPage => {
  return { type: SET_CURRENT_PAGE, payload: currentPage };
};
