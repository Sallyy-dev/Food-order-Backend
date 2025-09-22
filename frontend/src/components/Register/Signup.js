import React, { useState } from "react";
import "../../UI/signupForm.css";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function SignupForm() {
  const [inputForm, setInputForm] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
const API_URL = process.env.REACT_APP_API_URL;
  const handelSumbit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(null);
    try {
      const body = {
        username: `${inputForm.firstName} ${inputForm.secondName}`.trim(),
        email: inputForm.email,
        password: inputForm.password,
        confirmPassword: inputForm.confirmPassword,
      };
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.message || "Register Failled");
        return;
      }
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <div className="signup-container">
      {success && (
        <Stack
          sx={{
            width: "50%",
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2000,
            backgroundColor: "#fc8a06",
          }}
          spacing={2}
        >
          <Alert
            variant="filled"
            severity="success"
            sx={{ backgroundColor: "#fc8a06" }}
          >
            Login successful!
          </Alert>
        </Stack>
      )}
      <div className="signup-box" sx={{}}>
        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="logo"
          />
        </div>
        <form onSubmit={handelSumbit}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter Your First Name"
            required
            value={inputForm.firstName}
            onChange={(e) => {
              setInputForm({ ...inputForm, firstName: e.target.value });
            }}
          />

          <label>Second Name</label>
          <input
            type="text"
            placeholder="Enter Your Second Name"
            required
            value={inputForm.secondName}
            onChange={(e) => {
              setInputForm({ ...inputForm, secondName: e.target.value });
            }}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={inputForm.email}
            onChange={(e) => {
              setInputForm({ ...inputForm, email: e.target.value });
            }}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="******"
            required
            value={inputForm.password}
            onChange={(e) => {
              setInputForm({ ...inputForm, password: e.target.value });
            }}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="******"
            required
            value={inputForm.confirmPassword}
            onChange={(e) => {
              setInputForm({ ...inputForm, confirmPassword: e.target.value });
            }}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Continue"}
          </button>
          {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
        </form>

        <p className="signin-link">
          Having an account ? <a href="/login">sign in</a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
