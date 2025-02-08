import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginSignup/Login";
import OTP from "./pages/LoginSignup/Otp";
import SignUp from "./pages/LoginSignup/SignUp";
import SearchResults from "./pages/SearchResult/SearchResult";
import ProductDetail from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { LocationProvider } from "./contexts/LocationContext";
import "./App.css"
import OrderManagement from "./pages/Order/Order";



const App = () => {
  return (
    <Router>
      <LocationProvider>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} /> 
        <Route path="/otp" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<ProtectedRoute element={<SearchResults/>} />} />
        <Route path="/product/:productId" element={<ProtectedRoute element={<ProductDetail/>} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart/>} />} />
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout/>} />} />
        <Route path="/order" element={<ProtectedRoute element={<OrderManagement/>} />} />
      </Routes>
      </AuthProvider>
      </LocationProvider>
    </Router>
  );
};

export default App;
