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

## React Components Hierarquy

- Tier0 : App.js

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




