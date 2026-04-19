import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import API from "../../api/API.js";
import { useAuth } from "../../auth/AuthContext.js";
import "./LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await API.get(`/usercredentials/email/${encodeURIComponent(email)}`);

    if (!result.isSuccess || !result.result || result.result.length === 0) {
      setError("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    const record = result.result[0];
    const passwordMatch = await bcrypt.compare(password, record.PasswordHash);

    if (!passwordMatch) {
      setError("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    login({ userID: record.UserID, userEmail: record.UserEmail });
    navigate("/");
  };

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h2>Welcome Back</h2>
        <p className="loginSubtitle">Sign in to your account</p>

        <form className="loginFields" onSubmit={handleLogin}>
          <div className="loginField">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="loginField">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="loginError">{error}</p>}

          <button type="submit" className="loginButton" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
