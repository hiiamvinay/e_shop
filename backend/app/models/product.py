from datetime import datetime

mysql = None

def init_model_product(mysql_instance):
    global mysql
    mysql = mysql_instance

class Product:
    def __init__(self, product_id=None, product_name=None, img_url=None, short_description=None,
                 long_description=None, market_price=None, discounted_price=None, 
                 is_rent=None, apply_charity=None, product_rating=None, available_quantity=None,
                 created_at = None):
        self.product_id = product_id
        self.product_name = product_name
        self.img_url = img_url
        self.short_description = short_description
        self.long_description = long_description
        self.market_price = market_price
        self.discounted_price = discounted_price
        self.is_rent = is_rent
        self.apply_charity = apply_charity
        self.product_rating = product_rating
        self.available_quantity = available_quantity
        self.created_at = created_at
    

    @staticmethod
    def get_product_id_by_product_name(product_name):
        """Fetch a product ID by product name."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT product_id FROM products WHERE product_name = %s", (product_name,))
            result = cur.fetchone()
        return result[0] if result else None  # Return product ID or None if not found

    @staticmethod
    def get_all_products():
        """Fetch all products from the database."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM products")
            results = cur.fetchall()
        return [Product(*result) for result in results]  # Convert to Product objects

    @staticmethod
    def insert_product(product_name, img_url, short_description, long_description, 
                      market_price, discounted_price, is_rent, apply_charity, 
                      product_rating, available_quantity):
        """Insert a new product into the database."""
        created_at = datetime.now()  # Set created_at to the current time
        with mysql.connection.cursor() as cur:
            cur.execute(
                "INSERT INTO products (product_name, img_url, short_description, long_description, "
                "market_price, discounted_price, is_rent, apply_charity, product_rating, available_quantity, created_at) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (product_name, img_url, short_description, long_description, 
                 market_price, discounted_price, is_rent, apply_charity, 
                 product_rating, available_quantity, created_at)
            )
            mysql.connection.commit()
            return cur.lastrowid 

    @staticmethod
    def get_product_by_product_id(product_id):
        """Fetch a product by its ID."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM products WHERE product_id = %s", (product_id,))
            result = cur.fetchone()
        return Product(*result) if result else None  # Convert to Product object

    @staticmethod
    def get_all_products_charity():
        """Fetch all products where apply_charity is true."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM products WHERE apply_charity = TRUE")
            results = cur.fetchall()
        return [Product(*result) for result in results]  # Convert to Product objects

    @staticmethod
    def is_rentable(product_id):
        """Check if a product is rentable."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT is_rent FROM products WHERE product_id = %s", (product_id,))
            result = cur.fetchone()
        return result[0] if result else None  # Return True or False
    
    @staticmethod
    def update_available_quantity(product_id, new_quantity):
        """Update the available quantity of a product."""
        with mysql.connection.cursor() as cur:
            # Directly update the available quantity
            cur.execute(
                "UPDATE products SET available_quantity = %s WHERE product_id = %s",
                (new_quantity, product_id)
            )
            mysql.connection.commit()
            
            return True



