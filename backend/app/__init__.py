
from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS

from app.config import Config
from app.routes.auth import auth_bp, init_auth_blueprint
from app.routes.product  import product_bp, init_product_blueprint
from app.routes.cart import cart_bp, init_cart_blueprint
from app.routes.order import order_bp, init_order_blueprint


from app.models.user import init_model_user
from app.models.product import init_model_product
from app.models.cart import init_model_cart
from app.models.order import init_model_order


from app.services.email import init_mail


mysql = MySQL()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    init_mail(app)
    mysql.init_app(app)

    init_model_user(mysql)
    init_model_product(mysql)
    init_model_order(mysql)
    init_model_cart(mysql)
    

    init_auth_blueprint(mysql)
    init_product_blueprint(mysql)
    init_cart_blueprint(mysql)
    init_order_blueprint(mysql)
   
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(product_bp, url_prefix='/product')
    app.register_blueprint(order_bp, url_prefix='/order')
    app.register_blueprint(cart_bp, url_prefix='/cart')
   
    
    

    
    return app
