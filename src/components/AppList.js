import React from "react";
import { connect } from "react-redux";
import Pagination from "./Pagination";

class AppList extends React.Component {
  paginatedApps() {
    // get current Apps
    const currentPage = this.props.pagination.currentPage;
    const appsPerPage = this.props.pagination.appsPerPage;
    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;

    return this.filteredApps().slice(indexOfFirstApp, indexOfLastApp);
  }

  filteredApps() {
    const appsFilteredByCategory = this.props.apps.filter(
      e =>
        this.props.selectedCategory.name == null ||
        e.categories.includes(this.props.selectedCategory.name)
    );

    if (this.props.searchQuery && this.props.searchQuery !== "") {
      // Implementar aqui a searchCenas com base na store
      const searchQuery = this.props.searchQuery.toLowerCase();

      let appsNames = [];

      appsFilteredByCategory.forEach(app => {
        appsNames.push(app.name.replace(/ /g, ""));
      });

      if (searchQuery && searchQuery !== "") {
        var filteredArr = appsNames.filter(x => {
          var xSub = x.substring(0, 3).toLowerCase();
          return (
            x.toLowerCase().includes(searchQuery) ||
            this.checkName(xSub, searchQuery)
          );
        });
      }

      const appsFilteredByCategoryAndQuery = [];

      appsFilteredByCategory.forEach(app => {
        if (filteredArr.includes(app.name.replace(/ /g, ""))) {
          appsFilteredByCategoryAndQuery.push(app);
        }
      });

      return appsFilteredByCategoryAndQuery;
    }

    return appsFilteredByCategory;
  }

  checkName(name, str) {
    const pattern = str
      .split("")
      .map(x => {
        return `(?=.*${x})`;
      })
      .join("");
    const regex = new RegExp(`${pattern}`, "g");
    return name.match(regex);
  }

  renderList() {
    const currentApps = this.paginatedApps();

    return currentApps.map(app => {
      return (
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

  renderCategories(categories) {
    return categories.map((category, index) => {
      return (
        <span key={index}>
          {categories.length - 1 !== index ? `${category} / ` : category}
        </span>
      );
    });
  }

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
        <Pagination total={this.filteredApps().length} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCategory: state.selectedCategory,
    apps: state.apps,
    pagination: state.pagination,
    searchQuery: state.searchQuery.term
  };
};

export default connect(mapStateToProps)(AppList);
