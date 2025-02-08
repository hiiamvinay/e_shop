import React from 'react';
import './ProductCard.css'; // Make sure to style this component
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';



const ProductCard = ({ product }) => {

    const navigate = useNavigate();

    const getRatingClass = (rating) => {
        if (rating >= 4) return 'rating-green';
        if (rating >= 2) return 'rating-yellow';
        return 'rating-red';
    };

    const handleCardClick = () => {
        navigate(`/product/${product.product_id}`);
      };

    // Calculate discount percentage
    const calculateDiscount = (originalPrice, discountedPrice) => {
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    };

    const discountPercentage = calculateDiscount(product.market_price, product.discounted_price);

    return (
        <div className="product-card" onClick={handleCardClick} >
            
            <img src={product.img_url} alt={product.product_name} className="product-image" />
            <h3 className="product-name">{product.product_name}</h3>
            <p className="product-description">{product.short_description}</p>
            <div className="price-container">
                <p className="product-original-price">
                    <span id='rupee-icon'><CurrencyRupeeIcon /></span><s>{product.market_price}</s>
                </p>
                <p className="product-mrp highlight-price">
                    <span id='rupee-icon'><CurrencyRupeeIcon /></span> {product.discounted_price}
                </p>
            </div>
            {discountPercentage > 0 && (
                <p className="discount-info">
                    <span className="discount-percentage">{discountPercentage}% off</span>
                </p>
            )}
            <p className={`product-rating ${getRatingClass(product.product_rating)}`}>
                Rating: {product.product_rating} <span className="star-icon">⭐</span>
            </p>
            
            
        </div>
    );
};

export default ProductCard;


