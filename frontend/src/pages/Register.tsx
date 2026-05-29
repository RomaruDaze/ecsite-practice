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
      alert("登録が完了しました！ログインしてください。");
      navigate("/login");
    } else {
      setError(
        "登録に失敗しました。メールアドレスが既に使用されている可能性があります。",
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">新規会員登録</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">お名前</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">パスワード</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          アカウント作成
        </button>
      </form>
      <p className="text-center mt-3">
        すでにアカウントをお持ちですか？{" "}
        <Link to="/login">ログインはこちら</Link>
      </p>
    </div>
  );
};

export default Register;
