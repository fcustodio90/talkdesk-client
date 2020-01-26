import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectCategory, setCurrentPage } from "../actions";

class SideBarList extends React.Component {
  onSelectCategory(category) {
    // everytime we select a category while using the sidebar the currentPage should be
    // set to one in order to display the pagination at first page
    this.props.setCurrentPage(1);
    // sets the new selectedCategory on redux store
    this.props.selectCategory(category);
  }

  // helper method for css styling, applies active class
  renderActiveCategory(category) {
    return this.props.selectedCategory.name === category ? "active" : "";
  }

  renderList() {
    return this.props.categories.map((category, index) => {
      return (
        <li key={index} className={this.renderActiveCategory(category)}>
          <Link to="/" onClick={e => this.onSelectCategory(category)}>
            {category}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <nav className="nav-categories">
        <h2>Categories</h2>
        <ul className="nav-menu">{this.renderList()}</ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    apps: state.apps,
    categories: state.categories,
    selectedCategory: state.selectedCategory
  };
};

export default connect(
  mapStateToProps,
  { selectCategory, setCurrentPage }
)(SideBarList);
