import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css'; 

const ProductList = ({ products }) => {
    return (
        <div className="product-list">
            
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
