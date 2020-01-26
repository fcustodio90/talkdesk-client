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

### App.js

Responsible for handling the initial request to the API in order to fetch the apps and populate the redux store
Responsible for populating the redux store with categories after the store is populated with apps. This is achieved without
making another request. The application is designed to only make one API Request during the whole navigation process.

Has the following childs:
- SideBarList
- SearchBar
- AppList

### AppList.js

Responsible for most of the Application business logic from wiring action creators to algorythms to apply on redux store apps without modifying it or making extra API Requests.
Handles some pagination logic, for instance, how to slice the array of apps
Handles apps filter by category
Handles apps filter by searchQuery

Has the following childs:
- Pagination

### Pagination.js

Responsible for rendering the pagination links and the rendering logic part of it

No childs

### SearchBar.js

Responsible for listening to onChange event and dispatching the searchQuery typed to the redux store to be used across the application

No childs

### SideBarList.js

Responsible for storing in redux which category is selected so the other components can make use of it in order to execute certain logic, for instance, the AppList needs to know if there is an active category selected in order to display only the records that match that certain category.

Is also responsible for re-setting the currentPage (pagination) everytime a new category is linked so the pagination when re-renders is always on first page.

No childs

## Reducers

### appsReducer.js

Handles everything related with fetching apps from the API

### categoriesReducer.js

Handles everything related with fetching categories from the previously populated apps in redux store.

### paginationReducer.js

Has an initial default state, for instance, currentPage starts with default value as 1, so when application renders the first time the page is always the first one. Also is responsible for knowing how many records should be shown per page, this is the only piece of code that knows it and it is where it should be changed.

### searchQueryReducer.js

Waits until an event listener dispatches an action with the searchQuery typed by the user.

### selectCategoryReducer.js

Sets the redux store with the current active selected category.

# Final Considerations

The current application has some faults that I've identified but by lack of time and since this is an already working piece of code I've decided to only add them here as considerations.

- There's too much logic in the actionCreator fetchApps, this is not a good practice since if the API for some reason changes the code is not modular enough and would cause a lot of re-factoring. This actionCreator should be agnostic to the API and the filtering/sort Logic should be extracted from it.

- Although Redux added an unecessary complexity to the challenge, I felt like this was the way to go since the challenge was designed to work with an API feeding the client-side, redux is the best choice in the long run since it scales better as the application grows since sharing props between parent and child or viceversa via callbacks can turn into a huge mess as the application grows.

- Using pagination in Redux was a huge mistake and I paid the price for it. There's a block of code commented that explains why. Basically I didn't make the pagination agnostic to the application which means my pagination most likely would not be able to be utilized outside of the appList scope. Also, storing the totalRecords in redux didn't work at all, and you can see that during the code I actually stop using it and start passing props from parent to child (AppList to Pagination) and only use it once when the application first mounts. Most likely using only react-state and passing the needed props from the parent would do the job quite well without creating a mess.

- I've noticed that in the challenge it was mentioned that this should be production ready. This was one of the reasons I decided to move the Json and install a fake server to better emulate a "real world" scenario however, there's one part of the code that I didn't include because honestly I don't have experience with it and would make me miss the deadline purposed. The problem is the searchBar. The search as you type mechanism is working but doesn't consider when one request arrives later than expected. Let me explain, lets assume the user types A and then Types B, so now the searchBar would have "AB" but what happens if the request of A arrives later than B? The user would still see AB on the searchBar but the results would be for A. This is horrible UX and arquitecture. I researched how to do it with redux-thunk by adding ID's to the request but the better option would be to consider using redux saga.





