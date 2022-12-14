/* @flow */

import "./PortfolioNav.css";
import * as React from "react";
import { useState, useContext } from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { Context } from "./Context";

export default function PortfolioNav(): React.Node {
  const [user, setUser] = useContext(Context);
  return (
    <div className="bg-light shadow-sm nav-scroller">
      <Nav className="nav-portfolio" role="navigation">
        <NavItem>
          {/* <NavLink className="nav-link" exact to="/">
            Overview
          </NavLink> */}
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/news">
            News
          </NavLink>
        </NavItem>
        {user == "client" && (
          <NavItem>
            <NavLink className="nav-link" to="/performance">
              Performance
            </NavLink>
          </NavItem>
        )}
        {user == "client" && (
          <NavItem>
            <NavLink className="nav-link" to="/transactions">
              Transactions
            </NavLink>
          </NavItem>
        )}
        {user == "client" && (
          <NavItem>
            <NavLink className="nav-link" to="/riskassessment">
              Risk Assessment
            </NavLink>
          </NavItem>
        )}
        {user == "client" && (
          <NavItem>
            <NavLink className="nav-link" to="/recommendations">
              Recommendations
            </NavLink>
          </NavItem>
        )}
        {user == "banker" && (
          <NavItem>
            <NavLink className="nav-link" to="/stockSelection">
              Stock Selection
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <Link className="nav-link" to="/">
            Logout
          </Link>
        </NavItem>
      </Nav>
    </div>
  );
}
