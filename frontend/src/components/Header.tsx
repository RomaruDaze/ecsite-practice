import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [word, setWord] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (word.trim() !== "") {
      navigate(`/search/${word}`);
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-container-top">
        <img
          src={logo}
          onClick={() => navigate("/home")}
          alt="Logo"
          style={{ cursor: "pointer" }}
        />

        <div className="search-bar">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
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
              <span className="me-2">こんにちは、{user.name}さん</span>
              <button
                className="logout-button btn btn-outline-danger btn-sm"
                onClick={() => {
                  logout();
                  navigate("/home");
                }}
              >
                ログアウト
              </button>
            </>
          ) : (
            <button className="login-button" onClick={() => navigate("/login")}>
              ログイン
            </button>
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
