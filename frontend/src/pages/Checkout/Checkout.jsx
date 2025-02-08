import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useAuth();
  
  // Fallback to empty state if no location state
  const { cartItems = [], totalPrice = 0, totalDiscountedPrice = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pinCode: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone Number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.pinCode.trim()) errors.pinCode = 'Pin Code is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

 

    const handlePlaceOrder = async () => {
    if (validateForm()) {
        try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/order/create_order`, {
            user_id: userId // Use the userId from useAuth hook
        });
        
        // Handle successful order creation
        console.log('Order created successfully:', response.data);
        
        // Check if order_id is returned
        if (response.data.order_id) {
            // Optional: You might want to do something with the order ID
            console.log('Created Order ID:', response.data.order_id);
        }
        
        // Set order placed state
        setIsOrderPlaced(true);
        } catch (error) {
        console.error('Order placement error:', error);
        
        // Optional: Handle specific error scenarios
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }
        }
    }
    };

  

  const renderOrderSummary = () => (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <div className="order-items-list">
        {cartItems.map(item => (
          <div key={item.product_id} className="order-item">
            <img src={item.img_url} alt={item.product_name} />
            <div className="order-item-details">
              <h3>{item.product_name}</h3>
              <p>
                Quantity: {item.quantity} | 
                {item.type === 'rent' ? `Rent: ${item.rent_day} days` : 'Buy'}
              </p>
              <div className="order-item-pricing">
                <span className="original-price">
                  <CurrencyRupeeIcon fontSize="small" /> {item.MRP}
                </span>
                <span className="discounted-price">
                  <CurrencyRupeeIcon fontSize="small" /> {item.discounted_price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="order-total">
        <div className="total-row">
    
          <span>Total Market Price:</span>
          <span><CurrencyRupeeIcon fontSize="small" /> {totalPrice.toFixed(2)}</span>
          
        </div>
        <div className="total-row savings-row">
          <span>Total Savings:</span>
          <span> &#x2212;<CurrencyRupeeIcon fontSize="small" /> {(totalPrice - totalDiscountedPrice).toFixed(2)}</span>
        </div>
        <div className="total-row total-payable">
          <span>Total Payable:</span>
          <span><CurrencyRupeeIcon fontSize="small" /> {totalDiscountedPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const renderDeliveryForm = () => (
    <div className="delivery-form-container">
      <h2>Delivery Information</h2>
      <form className="delivery-form">
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
            />
            {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
            />
            {formErrors.phone && <span className="error">{formErrors.phone}</span>}
          </div>
          <div className="form-group">
            <label>City</label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter City"
            />
            {formErrors.city && <span className="error">{formErrors.city}</span>}
          </div>
        </div>
        <div className="form-group full-width">
          <label>Delivery Address</label>
          <textarea 
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter Complete Delivery Address"
          />
          {formErrors.address && <span className="error">{formErrors.address}</span>}
        </div>
        <div className="form-group">
          <label>Pin Code</label>
          <input 
            type="text" 
            name="pinCode"
            value={formData.pinCode}
            onChange={handleInputChange}
            placeholder="Enter Pin Code"
          />
          {formErrors.pinCode && <span className="error">{formErrors.pinCode}</span>}
        </div>
      </form>
    </div>
  );

  const renderPaymentOptions = () => (
    <div className="payment-options-container">
      <h2>Payment Method</h2>
      <div className="payment-option selected">
        <LocalShippingIcon />
        <span>Cash on Delivery</span>
        <CheckCircleIcon className="selected-icon" />
      </div>
    </div>
  );

  if (isOrderPlaced) {
    return (
      <>
        <Header />
        <div className="order-confirmation">
          <CheckCircleIcon className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order will be delivered soon.</p>
          <button onClick={() => navigate('/order')}>Go to Orders </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="checkout-page">
        <div className="checkout-container">
          {renderOrderSummary()}
          <div className="checkout-details">
            {renderDeliveryForm()}
            {renderPaymentOptions()}
            <button 
              className="place-order-button"
              onClick={handlePlaceOrder}
            >
              <PaymentIcon /> Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;