# Talkdesk Client

This project was made for a front-end engineer interview challenge at talkdesk.

## Installation

Make sure before you start that you have the following dependencies installed on your local machine
  - Node.js
  - Npm

## Techstack used for the project

The follow frameworks/plugins have been used for this challenge:

  - React
  - Redux
  - Axios
  - Redux-thunk
  - React-router

## Get started

### Step One // Install dependencies

```bash
npm install
```
or
```bash
yarn install
```
### Step Two // Run locally 

```bash
npm start
```
or
```bash
yarn start
```
By default the client will run locally. After making sure that everything is ok proceed to step 3

### Step Three // Run the fake RestAPI

You'll notice that there is an api folder available. This project is fed by a fake server side RestAPI.
Follow the same installation steps and run:

```bash
npm install
```
```bash
npm start
```
The API will run by default on localhost:3001 unlike the client which will run on localhost:3000. If the server is not running locally the client side won't be fed any data whatsoever. 

### Step Four // OPTIONAL

This project is prepared to be used with ReduxDevTools. So if you feel like inspecting the store while using chrome make sure to download the tools here:

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

## React Components Hierarquy

### Tier0 - App.js

This component is responsible for fetching the apps from the RestAPI and also setting all the available categories and default totalRecords(redux store) which are needed to paginate the root page. Renders as childs the components:

- SideBarList
- SearchBar
- AppList

```jsx
class App extends React.Component {
  componentDidMount() {
    this.props.fetchApps();
  }

  componentDidUpdate() {
    this.props.fetchCategories(this.props.apps);
    this.props.fetchTotalRecords(this.props.apps.length);
  }

  render() {
    return (
      <div className="flex-container">
        <BrowserRouter>
          <Route path="/" exact component={SideBarList} />
          <section className="apps-list">
            <Route path="/" exact component={SearchBar} />
            <Route path="/" exact component={AppList} />
          </section>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { apps: state.apps };
};

export default connect(
  mapStateToProps,
  { fetchApps, fetchCategories, fetchTotalRecords }
)(App);
```
### TODO - Rest of the components

## Action Creators
 
 Responsible for making the only API(GET REQUEST) during all the client-side navigation.
 Fetches the json from the backend and proceeds to sort by Descending order based on the sum of subscriptions price.
 
```jsx
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
```

Maps the array of objects that was populated in the redux store and extracts all the available categories without duplicates and sorted alphabetically.
```jsx
export const fetchCategories = apps => {
  const categories = [...new Set(apps.flatMap(app => app.categories))].sort();

  return { type: FETCH_CATEGORIES, payload: categories };
};
```
Stores in redux which category is selected. This is needed not only for html/css goodies by displaying active classes but also for filtering the original apps array based on which category is selected by the user. Stores in redux the name of the active category

```jsx
export const selectCategory = category => {
  return { type: SELECT_CATEGORY, payload: category };
};
```

Both these action creators are responsible for handling the correct pagination data in redux. Note: This is not a great ideia and in fact it would be better to not use redux and stick with react-state in pagination component to make it agnostic to the application. As is, the pagination component being fed by redux store was not in fact the greatest ideia and made code more complicated than it had to be.
```jsx
export const fetchTotalRecords = totalRecords => {
  return { type: FETCH_TOTAL_RECORDS, payload: totalRecords };
};

export const setCurrentPage = currentPage => {
  return { type: SET_CURRENT_PAGE, payload: currentPage };
};
```





