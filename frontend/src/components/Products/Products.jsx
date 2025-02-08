import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList/ProductList';
import Spinner from '../Spinner/Spinner';
import "./Products.css"

const Products = () => {
    const [products, setProducts] = useState([]); // State to hold the products
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/product/all_products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data); 
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(); 
    }, []);

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }
    return (
        <div>
            <ProductList products={products} /> 
        </div>
    );
};

export default Products;
