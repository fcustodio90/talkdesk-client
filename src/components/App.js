import React from "react";
import "../index.css";

import SearchBar from "./SearchBar";
import SideBarList from "./SideBarList";
import AppList from "./AppList";
import Pagination from "./Pagination";
import { connect } from "react-redux";
import { fetchApps } from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchApps();
  }

  render() {
    return (
      <div className="flex-container">
        <SideBarList />
        <section className="apps-list">
          <SearchBar />
          <AppList />
          <Pagination />
        </section>
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
