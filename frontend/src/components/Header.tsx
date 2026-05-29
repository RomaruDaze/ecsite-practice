import React, { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/images/logo.png";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [word, setWord] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate("/home");
  };

  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  const handleRedirectToCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    logout();
    handleRedirectToHome();
  };

  const handleSearch = () => {
    if (word.trim() !== "") {
      navigate(`/search/${word}`);
    }
  };

  const handleSearchWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  return (
    <nav className="nav-container">
      <div className="nav-container-top">
        <img
          src={logo}
          onClick={handleRedirectToHome}
          alt="Logo"
          style={{ cursor: "pointer" }}
        />

        <div className="search-bar">
          <input type="text" value={word} onChange={handleSearchWordChange} />
          <button onClick={handleSearch}>
            <img
              src="https://img.icons8.com/ios-filled/50/search--v1.png"
              alt="search"
            />
          </button>
        </div>

        <div className="auth-actions">
          {user ? (
            <>
              <button className="show-cart-btn" onClick={handleRedirectToCart}>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                  alt=""
                />
              </button>
              <span className="me-2">Hello, {user.name}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="show-cart-btn" onClick={handleRedirectToLogin}>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                  alt=""
                />
              </button>
              <button className="login-button" onClick={handleRedirectToLogin}>
                Login
              </button>
            </>
          )}
        </div>
      </div>

      <div className="nav-container-bottom">
        <Link className="nav-link" to="/home">
          Home
        </Link>
        <Link className="nav-link" to="/products">
          Products
        </Link>
      </div>
    </nav>
  );
};

export default Header;
