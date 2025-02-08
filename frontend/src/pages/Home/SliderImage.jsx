import React, { useEffect, useState } from 'react';
import './SliderImage.css'; // Import the CSS file

const images = [
    { url: 'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg', caption: ''},
    { url: 'https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg', caption: '' },
    { url: 'https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg', caption: '' },
];

const SliderImage = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const plusSlides = (n) => {
        setSlideIndex((prevIndex) => (prevIndex + n + images.length) % images.length);
    };

    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    return (
        <div className="slideshow-container">
            {images.map((image, index) => (
                <div className={`mySlides fade ${index === slideIndex ? 'active' : ''}`} key={index}>
                    <div className="numbertext"></div>
                    <img src={image.url} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
                    <div className="text">{image.caption}</div>
                </div>
            ))}

            {/* Next and previous buttons */}
            <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
            <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>

            {/* The dots/circles */}
            
        </div>
    );
};

export default SliderImage;