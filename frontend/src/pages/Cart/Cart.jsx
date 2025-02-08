import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import './Cart.css';
import { useAuth } from '../../contexts/AuthContext';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/get_product/${productId}`);
      return {
        ...response.data,
        product_id: Number(response.data.product_id),
        market_price: parseFloat(response.data.market_price) || 0,
        discounted_price: parseFloat(response.data.discounted_price) || parseFloat(response.data.market_price) || 0,
        is_rent: Number(response.data.is_rent),
      };
    } catch (error) {
      console.error(`Error fetching product details for productId ${productId}:`, error);
      return null;
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart/get_cart?user_id=${userId}`);
      const cartData = response.data;

      const updatedCartItems = await Promise.all(cartData.map(async (item) => {
        const productDetails = await fetchProductDetails(item.product_id);
        if (productDetails) {
          return {
            ...item,
            product_name: productDetails.product_name,
            img_url: productDetails.img_url,
            MRP: productDetails.market_price,
            discounted_price: productDetails.discounted_price,
            is_rent: productDetails.is_rent,
            type: item.on_rent ? 'rent' : 'buy'
          };
        }
        return null;
      }));

      setCartItems(updatedCartItems.filter(Boolean));
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  useEffect(() => {
    const totalMRP = cartItems.reduce((sum, item) => sum + (item.MRP * item.quantity || 0), 0);
    const totalDiscounted = cartItems.reduce((sum, item) => {
      if (item.type === 'rent') {
        return sum + ((item.discounted_price / 100) * item.rent_day * item.quantity);
      }
      return sum + (item.discounted_price * item.quantity);
    }, 0);

    setTotalPrice(totalMRP);
    setTotalDiscountedPrice(totalDiscounted);
  }, [cartItems]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/change_quantity`, {
        user_id: userId,
        product_id: productId,
        quantity: newQuantity
      });

      setCartItems(cartItems.map(item => 
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleTypeToggle = async (productId) => {
    const currentItem = cartItems.find(item => item.product_id === productId);
    if (currentItem.is_rent !== 1) return;

    const newType = currentItem.type === 'buy' ? 'rent' : 'buy';

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/change_rent_status`, {
        user_id: userId,
        product_id: productId,
        on_rent: newType === 'rent' ? 1 : 0,
        rent_day: newType === 'rent' ? 1 : 0,
      });

      setCartItems(cartItems.map(item => 
        item.product_id === productId ? { ...item, type: newType } : item
      ));
    } catch (error) {
      console.error('Error changing rent status:', error);
    }
  };

  const handleDaysChange = async (productId, days) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/change_rent_status`, {
        user_id: userId,
        product_id: productId,
        on_rent: 1,
        rent_day: Number(days),
      });
      setCartItems(cartItems.map(item => (item.product_id === productId ? { ...item, rent_day: Number(days) } : item)));
    } catch (error) {
      console.error('Error changing rent days:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/remove_product`, {
        data: { user_id: userId, product_id: productId },
      });
      setCartItems(cartItems.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };
  const handleProceedToBuy = () => {
    navigate('/checkout', { 
      state: { 
        cartItems, 
        totalPrice, 
        totalDiscountedPrice 
      } 
    });
  };
  
 

  return (
    <>
      <Header />
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. Add an item to Cart</p>
        ) : (
          <div className="cart-container">
            <ul className="cart-list">
              {cartItems.map(item => (
                <li key={item.product_id} className="cart-item">
                  <div className="item-image">
                    <img src={item.img_url} alt={item.product_name} />
                  </div>
                  <div className="item-details">
                    <h2>{item.product_name}</h2>
                    <p className="price-section">
                      <span className="mrp-price" style={{ textDecoration: 'line-through' }}>
                        <CurrencyRupeeIcon fontSize="small" />{item.MRP}
                      </span>
                      &nbsp;&nbsp;
                      <span className="discounted-price">
                        <CurrencyRupeeIcon fontSize="small" /> {item.discounted_price}
                      </span>
                    </p>
                    <div className="quantity-control-wrapper">
                      <div className="quantity-control-label">
                        <ShoppingCartIcon fontSize="small" />
                        <span>Quantity</span>
                      </div>
                      <div className="quantity-control">
                        <button 
                          className="qty-button qty-decrease" 
                          onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="qty-button qty-increase" 
                          onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                        >
                          <AddIcon fontSize="small" />
                        </button>
                      </div>
                    </div>
                    {item.is_rent === 1 && (
                      <div className="rent-toggle-container">
                        <div 
                          className={`rent-toggle ${item.type === 'buy' ? 'buy-active' : 'rent-active'}`}
                          onClick={() => handleTypeToggle(item.product_id)}
                        >
                          <span className="toggle-text buy-text">Buy</span>
                          <span className="toggle-text rent-text">Rent</span>
                          <div className="toggle-slider"></div>
                        </div>
                      </div>
                    )}
                    {item.type === 'rent' && (
                      <div className="rent-days-control-wrapper">
                        <div className="rent-days-control-label">
                          <DateRangeIcon fontSize="small" />
                          <span>Rent Duration</span>
                        </div>
                        <div className="rent-days-control">
                          <button 
                            className="days-button days-decrease" 
                            onClick={() => handleDaysChange(item.product_id, Math.max(1, (item.rent_day || 1) - 1))}
                            disabled={(item.rent_day || 1) <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </button>
                          <input
                            type="number"
                            className="rent-days-input"
                            value={item.rent_day || 1}
                            onChange={(e) => {
                              const value = Math.max(1, parseInt(e.target.value) || 1);
                              handleDaysChange(item.product_id, value);
                            }}
                            min="1"
                          />
                          <button 
                            className="days-button days-increase" 
                            onClick={() => handleDaysChange(item.product_id, (item.rent_day || 1) + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </button>
                        </div>
                        <span className="days-unit">Days</span>
                      </div>
                    )}
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(item.product_id)}>
                    <DeleteIcon /> Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h3>Total Market Price: <CurrencyRupeeIcon fontSize="small" /> {totalPrice}</h3>
              <h3 style={{color:"red"}}>Total Savings: <CurrencyRupeeIcon fontSize="small" />- {(totalPrice - totalDiscountedPrice).toFixed(2)}</h3>
              <h2 style={{color:"green"}}>Price to Pay: <CurrencyRupeeIcon fontSize="small" /> {totalDiscountedPrice.toFixed(2)}</h2>
              <button className="proceed-button" onClick={handleProceedToBuy}>Proceed to Buy</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

