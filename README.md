

# E-Shop - Full-Stack E-Commerce Website

E-Shop is a full-stack e-commerce web application featuring a Flask backend and a React frontend. This project demonstrates a complete online shopping experience, including product browsing, cart management, checkout, user authentication with OTP verification, and order processing.

## Project Overview

- **Backend:**  
  The Flask backend provides RESTful API endpoints for user management, product listings, cart operations, and order processing. It connects to a MySQL database and includes services such as email-based OTP verification.

- **Frontend:**  
  The React frontend, built with Vite, offers a modern and responsive interface for customers to browse products, manage their shopping cart, and complete orders. It uses the React Context API for global state management.

## Project Structure

```
e-shop/
├── backend/                             # Flask backend
│   ├── app/                             # Main application package (models, routes, services, SQL scripts)
│   ├── .env                             # Backend environment variables
│   ├── requirements.txt                 # Python dependencies
│   └── run.py                           # Flask entry point
├── frontend/                            # React frontend
│   ├── public/                          # Public assets (e.g., favicon)
│   ├── src/                             # Source files (assets, components, context, pages)
│   ├── .env                             # Frontend environment variables
│   ├── package.json                     # Node.js dependencies and scripts
│   └── vit.config.js                    # Vite configuration
├── .gitignore                           # Git ignore file
├── LICENSE                              # MIT License file
└── README.md                            # This documentation
```

## Getting Started

Follow the instructions in the respective directories:

- **Backend Setup:**  
  See [backend/README.md](./backend/README.md) for details on setting up and running the Flask API.

- **Frontend Setup:**  
  See [frontend/README.md](./frontend/README.md) for instructions on installing dependencies and running the React application.

## Environment Variables

### Frontend

Create a `.env` file in the `frontend` directory with the following content:

```dotenv
VITE_API_URL=http://localhost:5000
```

### Backend

Create a `.env` file in the `backend` directory with the following content:

```dotenv
FLASK_APP=run.py
FLASK_ENV=development  # Optional for development mode

# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_DB=e_shop
MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD

# Email Configuration
GMAIL_ID=YOUR_GMAIL_ID
GMAIL_APP_PASSWORD=YOUR_GMAIL_APP_PASSWORD
```

Replace the placeholder values with your actual credentials.

## Running the Project Locally

### Backend

1. Navigate to the backend directory and set up the Python environment:

   ```bash
   cd e-shop/backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. Run the Flask server:

   ```bash
   python run.py
   ```

   The API will be available at [http://localhost:5000](http://localhost:5000).

### Frontend

1. Navigate to the frontend directory and install dependencies:

   ```bash
   cd e-shop/frontend
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements and bug fixes.

## Contact

For questions or feedback, please contact me.


