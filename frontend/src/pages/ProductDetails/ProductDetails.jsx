import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../contexts/AuthContext';
import "./ProductDetails.css"

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const ProductDetail = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1); 
  const [product, setProduct] = useState(null); // Initialize as null
  const { userId } = useAuth(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/get_product/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct(); 
  }, [productId]); 


  const handleAddToCart = async () => {
    const on_rent = 0; // Set this based on your application logic
    const rent_day = 0; // Set this based on your application logic

    const cartData = {
      user_id: userId,
      product_id: Number(productId),
      on_rent,
      rent_day,
      quantity: Number(quantity),
    };
   
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/add_to_cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const result = await response.json();
      // alert(result.Message || 'Product added to cart successfully.');
      navigate('/cart'); 
    } catch (error) {
      console.error(error);
      alert('Error adding product to cart: ' + error.message);
    }
  };


  if (!product) return <p>Product not found!</p>;

  

  return (
    <>
      <Header />
      <div className='product-details'>
        <div className=''>
          <img id='product-img' src={product.img_url} alt={product['product-name']} />
        </div>
        <div className='product-info'>
          <div className='product-name'>
            <h1>{product.product_name}</h1>
          </div>
          <div className='product-des'>
            <p>{product.short_description} {product.long_description}</p>
          </div>

          <div className='product-price'>
            <p className='xxp'>
              <span className='mrp'><CurrencyRupeeIcon /><s>{product.market_price}</s></span>
              <span className='product-mrp'>
                <CurrencyRupeeIcon />{product.discounted_price} /only
              </span>
            </p>
          </div>

          {/* Quantity Selector */}
          <div className='product-quantity'>
            <label htmlFor='quantity' id='lable_q'>Please Select Quantity: </label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              min='1'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Add to Cart Button */}
          <div className='add-to-cart'>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
