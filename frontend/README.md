
# Frontend - E-Shop React Application

This is the frontend for the E-Shop e-commerce website. It is built using React with Vite and provides a responsive, modern UI for browsing products, managing the shopping cart, and completing purchases.

## Features

- Responsive user interface with React components
- Product browsing and detailed views
- Shopping cart and checkout functionality
- User authentication (login/signup with OTP)
- Global state management using React Context API

## Project Structure

```
frontend/
├── public/                          # Public assets (e.g., favicon)
├── src/                             # Source files
│   ├── assets/                      # Images, icons, fonts, etc.
│   ├── components/                  # Reusable UI components (Cart, Checkout, Footer, Header, ProductCard, ProductList, Products)
│   ├── context/                     # Global state management (Auth, Location, ProtectedRoute)
│   ├── pages/                       # Page components (Cart, Checkout, Home, LoginSignup, Order, ProductDetail, SearchResults)
│   ├── App.js                       # Main application component
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env                             # Environment variables
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md                        # This documentation
└── vit.config.js


## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/hiiamvinay/e-shop.git
   cd e-shop/frontend
   ```

2. **Install Dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `frontend` directory (if not already present) and add:

   ```dotenv
   VITE_API_URL=http://localhost:5000
   ```

   Replace `http://localhost:5000` with the actual URL of your backend if different.

4. **Run the Application:**

   Start the development server with:

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000) (or the port specified by Vite).

## Building for Production

To build an optimized production version, run:

```bash
npm run build
```

This will output the production-ready files to the `dist` folder.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, please contact me.
