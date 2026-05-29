import React, { useState, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router";
import { loginApi } from "../api/userApi";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = await loginApi(email, password);
    if (user) {
      login(user);
      navigate("/home");
    } else {
      setError("Email Address or password is wrong.");
    }
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="login-page-form" onSubmit={handleSubmit}>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="text-center mt-3">
        Don't have account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
