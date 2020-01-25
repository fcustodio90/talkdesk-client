import React from "react";
import "../index.css";

import SearchBar from "./SearchBar";
import SideBarList from "./SideBarList";
import AppList from "./AppList";
import Pagination from "./Pagination";

class App extends React.Component {
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

export default App;
