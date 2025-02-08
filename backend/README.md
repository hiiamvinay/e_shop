
# Backend - E-Shop Flask API

This is the backend for the E-Shop e-commerce website. It is built using Flask and provides RESTful API endpoints for user authentication, product management, cart operations, order processing, and email OTP verification.

## Features

- User authentication and management
- Product listing and details
- Shopping cart management
- Order processing
- Email OTP service for user verification
- MySQL database integration

## Project Structure

```
backend/
├── app/                             # Main application package
│   ├── models/                      # Data models (cart, order, product, user)
│   ├── routes/                      # API endpoints (auth, cart, order, product)
│   ├── services/                    # Business logic (e.g. email OTP)
│   ├── sql/                         # SQL scripts and demo data
│   ├── __init__.py                  # Initializes the Flask app
│   └── config.py                    # Configuration settings
├── .env                             # Environment variables
├── requirements.txt                 # List of dependencies
├── run.py                           # Entry point to run the Flask app
└── README.md                        # This documentation
```

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/e-shop.git
   cd e-shop/backend
   ```

2. **Create and Activate a Virtual Environment (Optional but Recommended):**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the `backend` directory (if not already present) and add:

   ```dotenv
   FLASK_APP=run.py
   FLASK_ENV=development  # Optional: for development mode

   # MySQL Configuration
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_DB=e_shop
   MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD

   # Email Configuration
   GMAIL_ID=YOUR_GMAIL_ID
   GMAIL_APP_PASSWORD=YOUR_GMAIL_APP_PASSWORD
   ```

5. **Initialize the Database:**

   Use the SQL scripts in the `app/sql/` folder (e.g., `createtable.sql`) to create the required tables and optionally insert demo data.

## Running the Backend

Start the Flask server with:

```bash
python run.py
```

Or, if you prefer using the Flask CLI:

```bash
flask run
```

The API will be available at [http://localhost:5000](http://localhost:5000).

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, please contact me.



