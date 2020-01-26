import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentPage } from "../actions";

class Pagination extends React.Component {
  calculatePageNumbers() {
    const appsPerPage = this.props.pagination.appsPerPage;
    const totalAppsRecords = this.props.total;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAppsRecords / appsPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  setCurrentPage(currentPage) {
    this.props.setCurrentPage(currentPage);
  }

  renderPageNumbers() {
    const pageNumbers = this.calculatePageNumbers();
    return pageNumbers.map(num => {
      return (
        <li key={num}>
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
