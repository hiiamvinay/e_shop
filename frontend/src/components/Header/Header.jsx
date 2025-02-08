import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from "../../assets/logo.webp"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import { LocationContext } from '../../contexts/LocationContext';
import items from '../../utils/items';

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isItemDropdownOpen, setItemDropdownOpen] = useState(false);
    const navigate = useNavigate();

    
    const { selectedLocation, setSelectedLocation, locations } = useContext(LocationContext);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setItemDropdownOpen(e.target.value.length > 0);
    };

    const handleSearchSubmit = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setItemDropdownOpen(false);
        }
    };

    const filteredItems = items.filter(item =>
        item.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setDropdownOpen(false); 
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className='header'>
            <button className='logo_button'>
                <img id='logo_img' src={Logo} onClick={handleLogoClick} alt="Logo" />
            </button>
            <div className='search_bar'>
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setItemDropdownOpen(searchTerm.length > 0)}
                />
                <button className='search-button' onClick={handleSearchSubmit}> Search </button>
                {isItemDropdownOpen && (
                    <ul className='item-dropdown'>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <li key={index} onClick={() => {
                                    setSearchTerm(item);
                                    setItemDropdownOpen(false);
                                    navigate(`/search?q=${encodeURIComponent(item)}`);
                                }}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li>No results found</li>
                        )}
                    </ul>
                )}
            </div>
            <nav>
                <ul>
                    <li className='location-container'>
                        <div className='location' onClick={toggleDropdown}>
                            <span className='selected-location'>
                                <span id='location-icon'>
                                    {selectedLocation === 'Select Location' ? (
                                        <span className='location_icon'>
                                            <LocationOffIcon />
                                        </span>
                                    ) : (
                                        <span className='location_icon'>
                                            <LocationOnIcon />
                                        </span>
                                    )}
                                </span>
                                {selectedLocation}
                            </span>
                            <span className='dropdown-arrow'></span>
                        </div>
                        {isDropdownOpen && (
                            <ul className='dropdown'>
                                {locations.map((location, index) => (
                                    <li key={index} onClick={() => handleLocationSelect(location)}>
                                        {location}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li><Link to="/order">Orders</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/login">Log out</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
