import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  const pathToHome = "/home";
  const handleRedirectToHome = () => {
    navigate(pathToHome);
  };

  const pathToLogin = "/login";
  const handleRedirectToLogin = () => {
    navigate(pathToLogin);
  };

  const handleSearch = () => {
    if (word.trim() !== "") {
      navigate(`/search/${word}`);
    } else {
      console.warn("Search word is empty.");
    }
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
          {/* 2. Bind the input value and onChange handler */}
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Optional: search on Enter key
          />
          <button onClick={handleSearch}>
            <img
              src="https://img.icons8.com/ios-filled/50/search--v1.png"
              alt="search"
            />
          </button>
        </div>
        <button className="login-button" onClick={handleRedirectToLogin}>
          ログイン
        </button>
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
