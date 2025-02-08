-- Create the database
CREATE DATABASE e_shop;

-- Use the database
USE e_shop;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(225) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL
);

-- Create the products table with product_id starting from 100
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incrementing ID for each product
    product_name VARCHAR(255) NOT NULL,  -- Product name, cannot be null
    img_url VARCHAR(255),  -- URL for the product image
    short_description TEXT,  -- Short description of the product
    long_description TEXT,  -- Long description of the product
    market_price DECIMAL(10, 2) NOT NULL,  -- Market price with two decimal places
    discounted_price DECIMAL(10, 2),  -- Discounted price with two decimal places
    is_rent BOOLEAN DEFAULT FALSE,  -- Boolean value for rental option
    apply_charity BOOLEAN DEFAULT FALSE,  -- Boolean value for charity application
    product_rating FLOAT CHECK (product_rating >= 0 AND product_rating <= 5),  -- Rating between 0 and 5
    available_quantity INT NOT NULL DEFAULT 0,  -- Available quantity, cannot be null
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for when the product was created
) AUTO_INCREMENT=100;  -- Set the starting value for AUTO_INCREMENT





CREATE TABLE IF NOT EXISTS orders (
    order_id INT NOT NULL,  -- Unique identifier for each order
    user_id INT NOT NULL,  -- Foreign key to the users table
    product_id INT NOT NULL,  -- Change to BIGINT UNSIGNED to match products table
    quantity INT NOT NULL DEFAULT 1,  -- Quantity of the product ordered
    order_status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',  -- Status of the order
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the order was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp for when the order was last updated
    on_rent BOOLEAN DEFAULT FALSE,  -- Indicates if the order is a rental 
    rent_day INT DEFAULT 0,  -- Number of days for the rental
    PRIMARY KEY (order_id, product_id),  -- Composite primary key
    FOREIGN KEY (user_id) REFERENCES users(id),  -- Foreign key constraint to users table
    FOREIGN KEY (product_id) REFERENCES products(product_id)  -- Foreign key constraint to products table
);





CREATE TABLE cart (
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    on_rent TINYINT(1) DEFAULT 0,
    rent_day INT DEFAULT 0,
    quantity INT DEFAULT 1,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

