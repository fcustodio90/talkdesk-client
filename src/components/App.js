import React from "react";

import "../index.css";
import { connect } from "react-redux";
import { fetchApps } from "../actions";
import { BrowserRouter, Route } from "react-router-dom";

import SearchBar from "./SearchBar";
import SideBarList from "./SideBarList";
import AppList from "./AppList";
import Pagination from "./Pagination";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchApps();
  }

  render() {
    return (
      <div className="flex-container">
        <BrowserRouter>
          <Route path="/" exact component={SideBarList} />

          <section className="apps-list">
            <Route path="/" exact component={SearchBar} />
            <Route path="/" exact component={AppList} />
            <Route path="/" exact component={Pagination} />
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
  { fetchApps }
)(App);
