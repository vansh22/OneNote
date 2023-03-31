import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";

function Navbar({ showAlert }) {
  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logged out successfully", "success");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            OneNote
          </Link>
          <button
            className="navbar-toggler hamburger-icon"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className="custom-btn mx-1" to="/login" role="button">
                  Login <i className="fa-solid fa-right-to-bracket mx-2"></i>
                </Link>
                <Link className="custom-btn mx-1" to="/signup" role="button">
                  Signup <i className="fa-solid fa-right-to-bracket mx-2"></i>
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <button className="custom-btn" onClick={handleLogout}>
                  Logout <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
