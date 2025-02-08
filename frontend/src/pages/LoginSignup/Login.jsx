import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginSignUp.css";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        login(data.userid)
        navigate("/");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Reset loading after the request
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to Eshop</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-field">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Username"
            />
          </div>
          <div className="input-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
            />
            <span
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <div className="loader"></div> 
            ) : (
              "Login"
            )}
          </button>
        </form>
        <button onClick={() => navigate("/signup")} className="toggle-btn">
          New here? Sign Up
        </button>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;
