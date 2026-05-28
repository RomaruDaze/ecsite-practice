import { Link } from "react-router";
import logo from "../assets/images/logo.png";

const Header = () => {
  const pathToHome = "/home";
  const handleRedirectToHome = () => {
    window.location.href = pathToHome;
  };

  return (
    <nav className="nav-container">
      <div className="nav-container-top">
        <img src={logo} onClick={handleRedirectToHome} alt="" />
        <div className="search-bar">
          <input type="text" />
          <button>
            <img
              src="https://img.icons8.com/ios-filled/50/search--v1.png"
              alt="search"
            />
          </button>
        </div>
        <button className="logout-button">ログアウト</button>
      </div>
      <div className="nav-container-bottom">
        <Link className="nav-link" to="/home">
          Home
        </Link>
        <Link className="nav-link" to="/products">
          Products
        </Link>
        <Link className="nav-link" to="/home">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Header;
