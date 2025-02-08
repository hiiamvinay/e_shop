from flask import Blueprint, jsonify, request
from app.models.order import Order
from app.models.cart import Cart

mysql = None 

def init_order_blueprint(mysql_instance):
    global mysql
    mysql = mysql_instance

order_bp = Blueprint("order", __name__)

def format_data(all_orders):
    order_list = []
    for order in all_orders:
        order_list.append({
            "order_id": order.order_id,
            "user_id": order.user_id,
            "product_id": order.product_id,
            "quantity": order.quantity,
            "order_status": order.order_status,
            "created_at": order.created_at.isoformat() if order.created_at else None,
            "updated_at": order.updated_at.isoformat() if order.updated_at else None,
            "on_rent": order.on_rent,
            "rent_day": order.rent_day
        })
    return order_list

@order_bp.route("/by_userid/<int:user_id>", methods=['GET'])
def by_userid(user_id):
    """Fetch all orders for a given user ID and return them as JSON."""
    all_orders = Order.get_orders_by_user_id(user_id)
    formatted_orders = format_data(all_orders)
    return jsonify(formatted_orders), 200


@order_bp.route("/create_order", methods=["POST"])
def create_order():
    """
    Create a new order with products from the user's cart.
    
    Expected JSON input:
    {
        "user_id": 1
    }
    
    Process:
    1. Validate input data
    2. Retrieve cart items for the user
    3. Create order with cart items
    """
    # Validate input data
   
    data = request.get_json()
    
    if not data or 'user_id' not in data:
        return jsonify({"error": "Invalid input data"}), 400
    
    user_id = data['user_id']
    
    try:
        cart_items = Cart.get_cart_by_user_id(user_id)
        
        # Prepare products list for order creation
        products = [
            {
                "product_id": item.product_id, 
                "quantity": item.quantity, 
                "on_rent": item.on_rent, 
                "rent_day": item.rent_day
            } 
            for item in cart_items
        ]
        
        # Create order
        if not products:
            return jsonify({"error": "Cart is empty"}), 400
        
        order_id = Order.create_order(user_id, products)
        clear = Cart.clear_cart(user_id=user_id)
        
        return jsonify({
            "order_id": order_id, 
            "message": "Order created successfully", 
            "products": products
        }), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@order_bp.route("/by_orderid/<int:order_id>", methods=['GET'])
def by_orderid(order_id):
    """Fetch all orders for a given user ID and return them as JSON."""
    all_orders = Order.get_product_by_order_id(order_id=order_id)
    formatted_orders = format_data(all_orders)
    return jsonify(formatted_orders), 200

@order_bp.route("/by_userid_and_status", methods=['POST'])
def get_userid_andstatus():
    data = request.get_json()
    if not data or 'user_id' not in data or 'order_status' not in data:
        return jsonify({"error": "Invalid input data"}), 400
    user_id = data['user_id']
    order_status = data['order_status']
    all_orders= Order.get_orders_by_user_id_and_status(user_id=user_id, order_status=order_status)
    formatted_orders = format_data(all_orders)
    return jsonify(formatted_orders), 200


@order_bp.route("/change_order_status", methods=['PUT'] )
def chnage_order_status():
    data = request.get_json()
    if not data or 'order_id' not in data or 'order_status' not in data:
        return jsonify({"error": "Invalid input data"}), 400
    order_id = data['order_id']
    order_status = data['order_status']
    try:
        message = Order.change_order_status(order_id=order_id, order_status=order_status)
        return jsonify({"message" : message})
    except Exception as e:
        return jsonify({"Error" : str(e)}), 400








