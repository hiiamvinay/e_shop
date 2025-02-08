import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginSignUp.css";
import { toast, ToastContainer } from "react-toastify";


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/create_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        // toast.success("OTP sent to your email.");
        navigate("/otp");
      } else {
        alert(data.message || "Sign-Up failed.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up to Eshop</h2>
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
          <div className="input-field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email"
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
          <div className="input-field password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm Password"
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
              "Sign Up"
            )}
          </button>
        
        </form>
        <button onClick={() => navigate("/login")} className="toggle-btn">
          Already have an account? Login
        </button>
      </div>
      
    </div>
  );
};

export default SignUp;
