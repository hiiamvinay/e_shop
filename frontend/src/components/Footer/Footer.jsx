// Footer.js
import React from 'react';
import './Footer.css'; 
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h5>Company</h5>
                    <a href="#">About Us</a>
                    <a href="#">Careers</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
                <div className="footer-section">
                    <h5>Support</h5>
                    <a href="#">Contact Us</a>
                    <a href="#">FAQ</a>
                    <a href="#">Shipping Info</a>
                    <a href="#">Returns</a>
                </div>
                <div className="footer-section">
                    <h5>Follow Us</h5>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                        <a href="#" aria-label="Twitter"><TwitterIcon /></a>
                        <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                        <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h5>Subscribe</h5>
                    <p>Sign up for our newsletter to receive updates and offers.</p>
                    <a href="#">Subscribe</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Eshop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
