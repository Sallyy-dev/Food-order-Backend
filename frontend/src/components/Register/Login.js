import React, { useState } from "react";
import "../../UI/signupForm.css";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function LoginForm() {
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handelSumbit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const body = {
        email: inputForm.email,
        password: inputForm.password,
      };

      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login Failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="logo"
          />
        </div>
        <form onSubmit={handelSumbit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={inputForm.email}
            onChange={(e) =>
              setInputForm({ ...inputForm, email: e.target.value })
            }
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="******"
            required
            value={inputForm.password}
            onChange={(e) =>
              setInputForm({ ...inputForm, password: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Continue"}
          </button>

          {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
        </form>

        <p className="signin-link">
          No account ? <a href="/register">Create One</a>
        </p>
      </div>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default LoginForm;
