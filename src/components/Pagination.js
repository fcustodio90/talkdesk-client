import React from "react";
import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <ul className="pagination">
      <li>
        <Link to="/">&lt;</Link>
      </li>
      <li>
        <Link to="/" href="#">
          1
        </Link>
      </li>
      <li className="active">
        <Link to="/" href="#">
          2
        </Link>
      </li>
      <li>
        <Link to="/" href="#">
          3
        </Link>
      </li>
      <li>
        <Link to="/">&gt;</Link>
      </li>
    </ul>
  );
};

export default Pagination;
