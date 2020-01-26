import React from "react";
import { connect } from "react-redux";
import { fetchTotalRecords } from "../actions/index";
import Pagination from "./Pagination";

class AppList extends React.Component {
  appsToRender() {
    // get current Apps
    const currentPage = this.props.pagination.currentPage;
    const appsPerPage = this.props.pagination.appsPerPage;
    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;

    return this.props.apps.slice(indexOfFirstApp, indexOfLastApp);
  }

  renderList() {
    const currentApps = this.appsToRender();

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
      return <h1 key={index}>{category}</h1>;
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
        <Pagination />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { apps: state.apps, pagination: state.pagination };
};

export default connect(
  mapStateToProps,
  { fetchTotalRecords }
)(AppList);
