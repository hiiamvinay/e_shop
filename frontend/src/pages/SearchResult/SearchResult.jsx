import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import "./SearchResult.css"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResults() {

    const [products, setProducts] = useState([]); 
    

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
               console.log(error)
            }
        };

        fetchProducts(); 
    }, []);

    const query = useQuery();
    const searchTerm = query.get('q')?.toLowerCase() || ''; // Extract search term from URL

    
    const filteredProducts = products.filter(
        product =>
            product.product_name.toLowerCase().includes(searchTerm) ||
            product.short_description.toLowerCase().includes(searchTerm)
    );

    return (
        <>
        <Header/>
        <div className="search-results">
            <h1 id='search'>Search Results for: "{searchTerm}"</h1>

            {filteredProducts.length > 0 ? (
                <div className="products-list">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            ) : (
                <p>No products found for "{searchTerm}"</p>
            )}
        </div>
        <Footer/>
        </>
    );
}

export default SearchResults;
