from datetime import datetime

mysql = None

def init_model_order(mysql_instance):
    global mysql
    mysql = mysql_instance

class Order:
    def __init__(self, order_id=None, user_id=None, product_id=None, quantity=1, order_status="Pending",
                 created_at=None, updated_at=None, on_rent=0, rent_day=0):
        self.order_id = order_id
        self.user_id = user_id
        self.product_id = product_id
        self.quantity = quantity
        self.order_status = order_status
        self.created_at = created_at
        self.updated_at = updated_at
        self.on_rent = on_rent
        self.rent_day = rent_day

    @staticmethod
    def get_product_by_order_id(order_id):
        """Fetch all products associated with a given order ID."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM orders WHERE order_id = %s", (order_id,))
            results = cur.fetchall()
        return [Order(*result) for result in results]  # Convert to Order objects

    @staticmethod
    def create_order(user_id, products):
        """
        Create a new order with multiple products.
        
        :param user_id: ID of the user placing the order.
        :param products: List of dictionaries, each containing:
                        - product_id: ID of the product.
                        - quantity: Quantity of the product.
                        - on_rent: Whether the product is rented.
                        - rent_day: Number of rental days (if applicable).
        :return: The created order_id.
        """
        created_at = datetime.now()
        with mysql.connection.cursor() as cur:
            # Generate a new order_id, starting at 1000 if no records exist
            cur.execute("SELECT IFNULL(MAX(order_id), 999) + 1 FROM orders")
            order_id = cur.fetchone()[0]
            
            # Insert each product in the order
            for product in products:
                cur.execute(
                    "INSERT INTO orders (order_id, user_id, product_id, quantity, order_status, "
                    "created_at, updated_at, on_rent, rent_day) "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (order_id, user_id, product['product_id'], product['quantity'], "Pending", 
                    created_at, created_at, product.get('on_rent', 0), product.get('rent_day', 0))
                )
            mysql.connection.commit()
        return order_id

    @staticmethod
    def get_orders_by_user_id(user_id):
        """Fetch all orders associated with a user ID."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM orders WHERE user_id = %s", (user_id,))
            results = cur.fetchall()
        return [Order(*result) for result in results]  # Convert to Order objects
    
    @staticmethod
    def get_orders_by_user_id_and_status(user_id, order_status):
        """Fetch all orders associated with a user ID and a specific order status."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM orders WHERE user_id = %s AND order_status = %s", (user_id, order_status))
            results = cur.fetchall()
        return [Order(*result) for result in results]  # Convert to Order objects


    @staticmethod
    def change_order_status(order_id, order_status):
        """
        Change the status of all products in a given order.
        
        :param order_id: The order ID whose status needs to be updated.
        :param order_status: The new status to apply (e.g., "Shipped").
        """
        with mysql.connection.cursor() as cur:
            cur.execute(
                "UPDATE orders SET order_status = %s, updated_at = %s WHERE order_id = %s",
                (order_status, datetime.now(), order_id)
            )
            mysql.connection.commit()
            return True
