from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# This will be set when the model is initialized
mysql = None

def init_model_user(mysql_instance):
    global mysql
    mysql = mysql_instance

class User:
    def __init__(self, id=None, username=None,  email=None,  password=None,created_at=None, last_login=None):
        self.id = id
        self.username = username
        self.password = password
        self.email = email
        self.created_at = created_at
        self.last_login = last_login

    @staticmethod
    def get_all_users():
        """Fetch all users from the database."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM users")
            results = cur.fetchall()
        return [User(*result) for result in results]  # Convert to User objects

    @staticmethod
    def get_user_by_id(user_id):
        """Fetch a user by ID."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            result = cur.fetchone()
        return User(*result) if result else None  # Convert to User object

    @staticmethod
    def get_user_id_by_username(username):
        """Fetch a user ID by username."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT id FROM users WHERE username = %s", (username,))
            result = cur.fetchone()
        return result[0] if result else None  # Return user ID or None if not found

    

    @staticmethod
    def check_user_password(username, password):
        """Public method to check user password."""
        with mysql.connection.cursor() as cur:
            cur.execute("SELECT password FROM users WHERE username = %s", (username,))
            result = cur.fetchone()
        
        if result:
            stored_password = result[0]
            return check_password_hash(stored_password,password)  
        return False  
    @staticmethod
    def create_user(username, password, email):
        """Create a new user in the database."""
        hashed_password = generate_password_hash(password)
        created_at = datetime.now()  # Set created_at to the current time
        with mysql.connection.cursor() as cur:
            cur.execute("INSERT INTO users (username, password, email, created_at) VALUES (%s, %s, %s, %s)", 
                        (username, hashed_password, email, created_at))
            mysql.connection.commit()
            return cur.lastrowid  # Return the ID of the new user

    @staticmethod
    def update_user(user_id, username=None, password=None, email=None):
        """Update an existing user."""
        with mysql.connection.cursor() as cur:
            if username:
                cur.execute("UPDATE users SET username = %s WHERE id = %s", (username, user_id))
            if password:
                hashed_password = generate_password_hash(password)
                cur.execute("UPDATE users SET password = %s WHERE id = %s", (hashed_password, user_id))
            if email:
                cur.execute("UPDATE users SET email = %s WHERE id = %s", (email, user_id))
            mysql.connection.commit()

    @staticmethod
    def delete_user(user_id):
        """Delete a user from the database."""
        with mysql.connection.cursor() as cur:
            cur.execute("DELETE FROM users WHERE id = %s", (user_id,))
            mysql.connection.commit()

    @staticmethod
    def update_last_login(username):
        """Update the last login timestamp for a user."""
        last_login = datetime.now()  # Set last_login to the current time
        with mysql.connection.cursor() as cur:
            cur.execute("UPDATE users SET last_login = %s WHERE username = %s", (last_login, username))
            mysql.connection.commit()
