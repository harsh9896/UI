import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
export default function HeaderComponent() {
  const authContext = useAuth();

  const isAuthenticated = authContext.isAuthenticated;
  const userType = authContext.userType;
  const userName = authContext.userName;

  function logoutUser() {
    authContext.logout();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#">
          ArticleMarket
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {isAuthenticated &&
                ((userType === "customer" && (
                  <Link className="nav-link" to={"/Articles/" + userName}>
                    Home <span className="sr-only">(current)</span>
                  </Link>
                )) ||
                  (userType === "seller" && (
                    <Link
                      className="nav-link"
                      to={"/MyArticlesForSeller/" + userName}
                    >
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  )))}
            </li>
            <li className="nav-item active">
              {isAuthenticated &&
                ((userType === "customer" && (
                  <Link className="nav-link" to="/MyArticlesForCustomer">
                    My Articles <span className="sr-only">(current)</span>
                  </Link>
                )) ||
                  (userType === "seller" && (
                    <Link className="nav-link" to="/Article/-1">
                      Add Articles <span className="sr-only">(current)</span>
                    </Link>
                  )))}
            </li>
            <li className="nav-item active">
              {isAuthenticated && (
                <Link
                  className="nav-link"
                  to="/MyArticlesForCustomer"
                  onClick={logoutUser}
                >
                  logout <span className="sr-only">(current)</span>
                </Link>
              )}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {isAuthenticated && (
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            )}
            {isAuthenticated && (
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            )}
          </form>
        </div>
      </nav>
    </div>
  );
}
