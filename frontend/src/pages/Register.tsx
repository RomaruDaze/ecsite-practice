import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { registerApi } from "../api/userApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await registerApi(name, email, password);
    if (success) {
      alert("Register is Complete! Please login now");
      navigate("/login");
    } else {
      setError("Register is failed. use a different email address.");
    }
  };

  return (
    <div className="register-page-container">
      <h2 className="text-center mb-4">Account Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="register-page-form" onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
