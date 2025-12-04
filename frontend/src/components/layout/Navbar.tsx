import { Link, NavLink } from "react-router-dom";
import type { RFCType } from "../../types";

const Navbar: RFCType = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>

        <ul className="navbar-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "navbar-link active" : "navbar-link"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
