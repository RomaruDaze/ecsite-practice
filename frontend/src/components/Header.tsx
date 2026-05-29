import React, { useState, useEffect, type ChangeEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import logo from "../assets/images/logo.png";
import { useAuth } from "../hooks/useAuth";
import { fetchCartAllItem } from "../api/cartApi";

const Header = () => {
  const [word, setWord] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const updateCartBadgeCount = async () => {
      if (!user?.id) {
        if (isMounted) {
          // Use a functional state check to prevent synchronous re-renders if already 0
          setCartCount((prev) => (prev === 0 ? prev : 0));
        }
        return;
      }

      try {
        const items = await fetchCartAllItem(user.id);
        if (isMounted) {
          setCartCount(items.length);
        }
      } catch (error) {
        console.error("Failed to fetch cart count for header badge:", error);
      }
    };

    // Defer the execution past the immediate layout phase to eliminate synchronous loop warning
    const timer = setTimeout(() => {
      void updateCartBadgeCount();
    }, 0);

    const handleStorageUpdate = () => {
      void updateCartBadgeCount();
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("cartUpdatedDirectly", handleStorageUpdate);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("cartUpdatedDirectly", handleStorageUpdate);
    };
  }, [user?.id, location.pathname]);

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
              <button
                className="show-cart-btn"
                onClick={handleRedirectToCart}
                style={{ position: "relative", overflow: "visible" }}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                  alt="Cart"
                />
                {cartCount > 0 && (
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      fontSize: "0.7rem",
                      padding: "0.35em 0.5em",
                      transform: "translate(50%, -50%)",
                      display: "inline-block",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <span className="me-2 ms-3">Hello, {user.name}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="show-cart-btn" onClick={handleRedirectToLogin}>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                  alt="Cart"
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
