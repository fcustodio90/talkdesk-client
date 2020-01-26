import React from "react";
import { connect } from "react-redux";

class SearchBar extends React.Component {
  render() {
    return (
      <header>
        <input
          type="text"
          onChange={e => this.props.onSearchTermChange(e.target.value)}
          value={this.props.value}
        />
      </header>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchTermChange: value =>
      dispatch({
        type: "SET_SEARCH_QUERY",
        payload: value.replace(/ /g, "")
      })
  };
};

const mapStateToProps = state => {
  return { searchQuery: state.searchQuery.string };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
