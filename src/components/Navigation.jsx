/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/

import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Navigation.css";

// Navigation bar
function Navigation() {
  // State variables for user login status and username
  const [login, setLogin] = useState(false);
  const [username, setName] = useState("");

  // Function to clear login session and reload the page
  const clearLogin = () => {
    sessionStorage.setItem("validated", false);
    sessionStorage.setItem("username", " ");
    window.location.reload();
  };

  // useEffect hook to update login status and username on component mount
  useEffect(() => {
    // Use strict equality (===) to compare with boolean
    if (sessionStorage.getItem("validated") === "true") {
      setLogin(true);
    } else {
      setLogin(false);
    }

    setName(sessionStorage.getItem("username"));
  }, []);

  // JSX structure for the navigation bar
  return (
    <nav className="navbar" style={{ backgroundColor: "#282c34" }}>
      <NavLink
        to="/"
        className="navbar-brand"
        style={{
          background: "linear-gradient(to right, #8B008B, #FF69B4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        HeartSteel
      </NavLink>
      <div>
        <ul className="navbar-nav mx-2 flex-row" id="navId">
          {/* Navigation links */}
          <li className="nav-item mx-2">
            <NavLink
              to="/cos30049/"
              style={{
                background: "linear-gradient(to right, #8B008B, #FF69B4)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink
              to="/cos30049/nftlisting"
              style={{
                background: "linear-gradient(to right, #8B008B, #FF69B4)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              NFTs
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink
              to="/cos30049/history"
              style={{
                background: "linear-gradient(to right, #8B008B, #FF69B4)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Transactions
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink
              to="/cos30049/inventory"
              style={{
                background: "linear-gradient(to right, #8B008B, #FF69B4)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Inventory
            </NavLink>
          </li>
          {/* Separator */}|{/* Conditional rendering based on login status */}
          {login ? (
            <li className="nav-item mx-2">
              <NavLink
                onClick={clearLogin}
                style={{
                  background: "linear-gradient(to right, #8B008B, #FF69B4)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Welcome, {username}
              </NavLink>
            </li>
          ) : (
            <li className="nav-item mx-2">
              <NavLink
                to="/cos30049/login"
                style={{
                  background: "linear-gradient(to right, #8B008B, #FF69B4)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
