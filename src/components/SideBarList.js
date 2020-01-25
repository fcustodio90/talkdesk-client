import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCategories,
  fetchAppsByCategory,
  selectCategory
} from "../actions";

class SideBarList extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  onSelectCategory(category) {
    this.props.selectCategory(category);
    this.props.fetchAppsByCategory(category);
  }

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
    categories: state.categories,
    selectedCategory: state.selectedCategory
  };
};

export default connect(
  mapStateToProps,
  { fetchCategories, fetchAppsByCategory, selectCategory }
)(SideBarList);
