import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentPage } from "../actions";

class Pagination extends React.Component {
  calculatePageNumbers() {
    // Gets the appsPerPage from redux store
    const appsPerPage = this.props.pagination.appsPerPage;

    // Ok this is bad design. I had to send the totalAppsPerRecord from the parent(appList)
    // this is one of the code blocks that I would re-do. There is no need whatsoever to make
    // the pagination agnostic. It should be used with react-state and agnostic to other components
    // in order to be easily re-utilized for other components. As is, this is not possible.
    const totalAppsRecords = this.props.total;

    const pageNumbers = [];

    // calculates the amount of pageNumbers to display
    for (let i = 1; i <= Math.ceil(totalAppsRecords / appsPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  setCurrentPage(currentPage) {
    // calls the action creator and sets the new currentPage at redux store
    // once called
    this.props.setCurrentPage(currentPage);
  }

  renderPageNumbers() {
    const pageNumbers = this.calculatePageNumbers();
    return pageNumbers.map(num => {
      return (
        <li
          key={num}
          className={this.props.pagination.currentPage === num ? "active" : ""}
        >
          <Link to="/" onClick={() => this.setCurrentPage(num)}>
            {num}
          </Link>
        </li>
      );
    });
  }

  renderFirst() {
    const firstPage = this.calculatePageNumbers()[0];
    return (
      <li>
        <Link to="/" onClick={() => this.setCurrentPage(firstPage)}>
          &lt;
        </Link>
      </li>
    );
  }

  renderLast() {
    const pageNumbers = this.calculatePageNumbers();
    const lastPage = pageNumbers[pageNumbers.length - 1];
    return (
      <li>
        <Link to="/" onClick={() => this.setCurrentPage(lastPage)}>
          &gt;
        </Link>
      </li>
    );
  }

  render() {
    return (
      <ul className="pagination">
        {this.renderFirst()}
        {this.renderPageNumbers()}
        {this.renderLast()}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return { apps: state.apps, pagination: state.pagination };
};

export default connect(
  mapStateToProps,
  { setCurrentPage }
)(Pagination);
