

// You need to add products to the product table one at a time using a POST request to:
// https://localhost:5000/product/insert_data/
//


/*
// Insert the JSON data in the request body. For example:
{
    "product_name": "Earbuds",
    "img_url": "https://m.media-amazon.com/images/I/710dy4BFjLL._AC_UL480_FMwebp_QL65_.jpg",
    "short_description": "Wireless earbuds with great sound quality.",
    "long_description": "Boult Audio W20  35H Playtime, 45ms Low Latency, 13mm Bass Drivers, Type-C Fast Charging, Made in India.",
    "market_price": 2499,
    "discounted_price": 799,
    "is_rent": 0,
    "apply_charity": 0,
    "product_rating": 4.1,
    "available_quantity": 100
}

*/

// the sample data is given below in json array
[
    {
        "product_name": "Earbuds",
        "img_url": "https://m.media-amazon.com/images/I/710dy4BFjLL._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "Wireless earbuds with great sound quality.",
        "long_description": "Boult Audio W20  35H Playtime, 45ms Low Latency, 13mm Bass Drivers, Type-C Fast Charging, Made in India.",
        "market_price": 2499,
        "discounted_price": 799,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 4.1,
        "available_quantity": 100
    },
    {
        "product_name": "HTML and CSS: Design and Build Websites",
        "img_url": "https://images-na.ssl-images-amazon.com/images/I/613ZTDcDsiL._AC_UL165_SR165,165_.jpg",
        "short_description": "Made with high quality paper",
        "long_description": "A comprehensive guide to HTML and CSS.",
        "market_price": 1000.00,
        "discounted_price": 730.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 4.5,
        "available_quantity": 50
    },
    {
        "product_name": "MI Power Bank 3i 20000mAh",
        "img_url": "https://m.media-amazon.com/images/I/71lVwl3q-kL._AC_UL480_QL65_.jpg",
        "short_description": "Lithium Polymer 18W Fast Power Delivery Charging.",
        "long_description": "Input- Type C | Micro USB.",
        "market_price": 4999.00,
        "discounted_price": 1699.00,
        "is_rent": 1,
        "apply_charity": 0,
        "product_rating": 4.2,
        "available_quantity": 100
    },
    {
        "product_name": "Lenovo Laptop 12th Gen",
        "img_url": "https://m.media-amazon.com/images/I/81mgUtc9iKL._AC_UY327_FMwebp_QL65_.jpg",
        "short_description": "Intel Core i5-12450H (35.5cm) FHD.",
        "long_description": "250 Nits Thin & Light Laptop (16GB/512GB SSD).",
        "market_price": 70000.00,
        "discounted_price": 49190.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 4.3,
        "available_quantity": 30
    },
    {
        "product_name": "Smart Watch for Men Women",
        "img_url": "https://m.media-amazon.com/images/I/718aT6EGL4L._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "Stylish smartwatch with health monitoring.",
        "long_description": "Answer/Make Call, Heart Rate/Sleep Monitor, Pedometer.",
        "market_price": 8409.00,
        "discounted_price": 2520.00,
        "is_rent": 1,
        "apply_charity": 0,
        "product_rating": 4.1,
        "available_quantity": 20
    },
    {
        "product_name": "Smart Watch",
        "img_url": "https://m.media-amazon.com/images/I/61I22cL7v+L._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "Fitness Tracker with Heart Rate Monitor.",
        "long_description": "Blood Oxygen, Sleep Tracking, 1.5 Inch for Android iOS.",
        "market_price": 1849.00,
        "discounted_price": 1681.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 4.0,
        "available_quantity": 50
    },
    {
        "product_name": "Kingsted T-Shirts for Men",
        "img_url": "https://m.media-amazon.com/images/I/617IjJArgKL._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "Royally Comfortable Super Soft Premium Fabric.",
        "long_description": "Well-Crafted Classic T-Shirts.",
        "market_price": 4370.00,
        "discounted_price": 2864.62,
        "is_rent": 1,
        "apply_charity": 0,
        "product_rating": 3.9,
        "available_quantity": 100
    },
    {
        "product_name": "Apple iPhone 16 (128 GB) - Ultramarine",
        "img_url": "https://m.media-amazon.com/images/I/713SsA7gftL._AC_UY327_FMwebp_QL65_.jpg",
        "short_description": "iOS 17, RAM 128 GB.",
        "long_description": "Latest Apple iPhone with advanced features.",
        "market_price": 82000.00,
        "discounted_price": 79000.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 4.7,
        "available_quantity": 25
    },
    {
        "product_name": "Sumeet Thermo Water Bottle",
        "img_url": "https://m.media-amazon.com/images/I/61r6dU2NUuL._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "Stainless Steel 24 Hours Hot & Cold.",
        "long_description": "Double Walled Leak Proof 1 liter.",
        "market_price": 1560.00,
        "discounted_price": 485.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 3.9,
        "available_quantity": 200
    },
    {
        "product_name": "Notebook Diary",
        "img_url": "https://m.media-amazon.com/images/I/81HltUN+7iL._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "AccuPrints Hard Bound Diary.",
        "long_description": "5.8 * 8.3 inches with Elastic Lock PU.",
        "market_price": 599.00,
        "discounted_price": 147.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 4.0,
        "available_quantity": 150
    },
    {
        "product_name": "Remote Control Truck",
        "img_url": "https://m.media-amazon.com/images/I/717pTcRrigL._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "2 Speeds and 4 Headlight Modes.",
        "long_description": "Lithium Battery | C-Type Charging.",
        "market_price": 2799.00,
        "discounted_price": 1309.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 4.3,
        "available_quantity": 75
    },
    {
        "product_name": "Creamy Lipstick",
        "img_url": "https://m.media-amazon.com/images/I/51MQPak-I3L._AC_UL480_FMwebp_QL65_.jpg",
        "short_description": "Swiss Beauty Pure Matte Creamy Lipstick.",
        "long_description": "Non-drying, Highly pigmented Lipstick.",
        "market_price": 229.00,
        "discounted_price": 195.00,
        "is_rent": 0,
        "apply_charity": 0,
        "product_rating": 3.8,
        "available_quantity": 300
    }
]
