import React from "react";
import { connect } from "react-redux";
import { fetchCategories, fetchAppsByCategory } from "../actions";

class SideBarList extends React.Component {
  state = {
    selectedCategory: null
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  componentDidUpdate() {
    if (this.state.selectedCategory !== null) {
      this.props.fetchAppsByCategory(this.state.selectedCategory);
    }
  }

  renderList() {
    console.log(this.state);
    return this.props.categories.map((category, index) => {
      return (
        <li
          key={index}
          className={this.state.selectedCategory === category ? "active" : ""}
        >
          <a
            href="#"
            onClick={e => this.setState({ selectedCategory: category })}
          >
            {category}
          </a>
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
  return { categories: state.categories };
};

export default connect(
  mapStateToProps,
  { fetchCategories, fetchAppsByCategory }
)(SideBarList);
