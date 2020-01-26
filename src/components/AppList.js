import React from "react";
import { connect } from "react-redux";
import Pagination from "./Pagination";

class AppList extends React.Component {
  paginatedApps() {
    // get currentPage initial value is always 1
    // since we wanna be 100% on first page when re-rendering
    const currentPage = this.props.pagination.currentPage;

    // get apps per page -> this is fixed at 3
    // check paginationReducer for default state values
    const appsPerPage = this.props.pagination.appsPerPage;

    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;

    // calls filteredApps and slices based on index to display the right
    // records per page
    return this.filteredApps().slice(indexOfFirstApp, indexOfLastApp);
  }

  filteredApps() {
    // Initial setup filters apps from redux store by selectedCategory
    // returns an array of app objects
    const appsFilteredByCategory = this.props.apps.filter(
      e =>
        this.props.selectedCategory.name == null ||
        e.categories.includes(this.props.selectedCategory.name)
    );

    // First condition check the following block code will only executed based on two assumptions
    // One => the searchQuery is not undefined. When the component first gets rendered the redux
    //        store won't have a searchQuery since the action creator wasn't called yet.
    //
    // Two => Protects against empty searchQuery string, this happens when the user typed something
    //        but later deleted everything which makes the searchQuery in redux store empty

    if (this.props.searchQuery && this.props.searchQuery !== "") {
      // Conditions were met, this means there is a searchQuery to be applied to the already previously
      // filtered array of app objects (they were filtered by selectedCategory.)

      const searchQuery = this.props.searchQuery.toLowerCase();

      // initialize an array with apps names
      const appsNames = appsFilteredByCategory.map(app => {
        return app.name.replace(/ /g, "");
      });

      // Graps the appsNames array and matches it with the searchQuery
      // returns an array with results(apps names) that were valid regex Matches
      // with the searchQuery
      const filteredArr = appsNames.filter(x => {
        const xSub = x.substring(0, 3).toLowerCase();
        return (
          x.toLowerCase().includes(searchQuery) ||
          this.checkName(xSub, searchQuery)
        );
      });

      // Iterates the apps filtered by Category compares it with the array with valid
      // regex matches and populates the previous mentioned array
      const appsFilteredByCategoryAndQuery = appsFilteredByCategory.filter(
        app => {
          return filteredArr.includes(app.name.replace(/ /g, ""));
        }
      );

      // In the end if the first if condition were met (this.props.searchQuery && this.props.searchQuery !== "")
      // returns an array of app objects filted by Category And searchQuery
      return appsFilteredByCategoryAndQuery;
    }

    // Else returns the usual array of app objects filted by category
    return appsFilteredByCategory;
  }

  checkName(name, str) {
    // ?= is a positive lookahead.
    // . matches any character except line break.
    // * matches zero or more instances of a character.
    // () is a capturing group, which is used to group characters together in a
    //    regular expression so that we can apply other operators (?=.*).
    // g is the global modifier which performs a global search of the string looking for matches.
    const pattern = str
      .split("")
      .map(x => {
        return `(?=.*${x})`;
      })
      .join("");
    const regex = new RegExp(`${pattern}`, "g");
    return name.match(regex);
  }

  // helper function to renderList
  renderList() {
    const currentApps = this.paginatedApps();

    return currentApps.map(app => {
      return (
        // somehow react doesn't like ids with dashes so I removed them and joined the string
        <li key={app.id.split("-").join("")}>
          <div className="app-item">
            <div className="box-info">
              <div className="box-info--content">
                <div className="description">
                  <h1>{app.name}</h1>
                  <p>{app.description}</p>
                </div>
                <div className="tags">
                  {this.renderCategories(app.categories)}
                </div>
              </div>
              <div className="box-info--footer">
                <ul>{this.renderSubscriptions(app.subscriptions)}</ul>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  // helper function to render categories on each app
  renderCategories(categories) {
    return categories.map((category, index) => {
      return (
        <span key={index}>
          {categories.length - 1 !== index ? `${category} / ` : category}
        </span>
      );
    });
  }

  // helper function to render subscriptions on each app
  renderSubscriptions(subscriptions) {
    return subscriptions.map((subscription, index) => {
      return (
        <li key={index}>
          <span>{subscription.name}</span>{" "}
          <h3>
            {subscription.price === 0
              ? "Free"
              : Math.round(subscription.price / 100).toFixed(2)}
            <sup>{subscription.price === 0 ? "" : "€"}</sup>
          </h3>
        </li>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <ul>{this.renderList()}</ul>
        <Pagination
          total={this.filteredApps().length}
          perPage={this.props.pagination.appsPerPage}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCategory: state.selectedCategory,
    apps: state.apps,
    pagination: state.pagination,
    searchQuery: state.searchQuery.string
  };
};

export default connect(mapStateToProps)(AppList);
