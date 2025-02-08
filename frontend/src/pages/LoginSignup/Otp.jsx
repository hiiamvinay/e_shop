import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./LoginSignUp.css";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Ensure only one digit
    setOtp(updatedOtp);

    // Automatically focus on the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true); 
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      alert("Please enter all 4 digits of the OTP.");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify_otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: enteredOtp }),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Account is Created, Please Login");
        navigate("/login");
      } else {
        alert(data.error || "OTP verification failed."); 
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred while verifying OTP.");
    } finally {
        setLoading(true); 
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Enter OTP</h2>
        <p>Please enter the 4-digit OTP sent to your email.</p>
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                required
                className="otp-input"
              />
            ))}
          </div>
         
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <div className="loader"></div> 
            ) : (
              "Verify Up"
            )}
          </button>
        </form>
        <button onClick={() => navigate("/signup")} className="toggle-btn">
          Go back to Sign Up
        </button>
      </div>
      
    </div>
  );
};

export default OTP;
