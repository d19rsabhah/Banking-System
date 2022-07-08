import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="inner-header">
        <Link to="/home">
          <div className="logo">
            <h1 style={{color:'#dcff18'}}>Banking App</h1>
          </div>
        </Link>
        <ul className="navigation">
          <Link to="/">
            <a>
              <li>Home</li>
            </a>
          </Link>
          <Link to="/users">
            <a>
              <li>Users</li>
            </a>
          </Link>
          <Link to="/createuser">
            <a>
              <li>Create User</li>
            </a>
          </Link>
          <Link to="/transaction">
            <a>
              <li>Transfer</li>
            </a>
          </Link>
          <Link to="/history">
            <a>
              <li>Transaction History</li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
