mysql = None

def init_model_cart(mysql_instance):
    global mysql
    mysql = mysql_instance

class Cart:
    def __init__(self, user_id=None, product_id=None, on_rent=0, rent_day=0, quantity=1):
        self.user_id = user_id
        self.product_id = product_id
        self.on_rent = on_rent
        self.rent_day = rent_day
        self.quantity = quantity

    @staticmethod
    def add_to_cart(user_id, product_id, on_rent=0, rent_day=0, quantity=1):
        """Add or update a product in the user's cart."""
        with mysql.connection.cursor() as cur:
            # Check if the product already exists in the cart
            cur.execute(
                "SELECT quantity FROM cart WHERE user_id = %s AND product_id = %s",
                (user_id, product_id)
            )
            result = cur.fetchone()

            if result:
                # Update the existing product quantity
                new_quantity = result[0] + quantity
                cur.execute(
                    "UPDATE cart SET quantity = %s, on_rent = %s, rent_day = %s "
                    "WHERE user_id = %s AND product_id = %s",
                    (new_quantity, on_rent, rent_day, user_id, product_id)
                )
            else:
                # Insert a new product into the cart
                cur.execute(
                    "INSERT INTO cart (user_id, product_id, on_rent, rent_day, quantity) "
                    "VALUES (%s, %s, %s, %s, %s)",
                    (user_id, product_id, on_rent, rent_day, quantity)
                )
            mysql.connection.commit()
            return True

    @staticmethod
    def remove_from_cart(user_id, product_id):
        """Remove a product from the user's cart."""
        with mysql.connection.cursor() as cur:
            cur.execute(
                "DELETE FROM cart WHERE user_id = %s AND product_id = %s",
                (user_id, product_id)
            )
            mysql.connection.commit()
            return True

    @staticmethod
    def get_cart_by_user_id(user_id):
        """Fetch all items in a user's cart."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM cart WHERE user_id = %s", (user_id,))
            results = cur.fetchall()
        return [Cart(*result) for result in results]  # Convert to Cart objects

    @staticmethod
    def clear_cart(user_id):
        """Clear all items in the user's cart."""
        with mysql.connection.cursor() as cur:
            cur.execute("DELETE FROM cart WHERE user_id = %s", (user_id,))
            mysql.connection.commit()
            return True

    @staticmethod
    def update_quantity(user_id, product_id, quantity):
        """Update the quantity of a product in the user's cart."""
        with mysql.connection.cursor() as cur:
            cur.execute(
                "UPDATE cart SET quantity = %s WHERE user_id = %s AND product_id = %s",
                (quantity, user_id, product_id)
            )
            mysql.connection.commit()
            return True

    @staticmethod
    def update_rent_status(user_id, product_id, on_rent, rent_day):
        """Update the on_rent status and rent_day for a product in the user's cart."""
        with mysql.connection.cursor() as cur:
            cur.execute(
                "UPDATE cart SET on_rent = %s, rent_day = %s WHERE user_id = %s AND product_id = %s",
                (on_rent, rent_day, user_id, product_id)
            )
            mysql.connection.commit()
            return True
