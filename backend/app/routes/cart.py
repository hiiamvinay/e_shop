from flask import Blueprint, jsonify, request
from app.models.cart import Cart

mysql = None 

def init_cart_blueprint(mysql_instance):
    global mysql
    mysql = mysql_instance

cart_bp = Blueprint("cart", __name__)


@cart_bp.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    
    if not data or 'user_id' not in data or "product_id" not in data or "on_rent" not in data or "rent_day" not in data or "quantity" not in data:
        return jsonify({"Error": "All fields are required."}), 400

    user_id = data['user_id']
    product_id = data['product_id']
    on_rent = data['on_rent']
    rent_day = data['rent_day']
    quantity = data['quantity']
    try:
        success = Cart.add_to_cart(user_id, product_id, on_rent, rent_day, quantity)
        if success:
            return jsonify({"Message": "Product added to cart successfully."}), 200
        else:
            return jsonify({"Error": "Failed to add product to cart."}), 500
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    

@cart_bp.route('/remove_product', methods=['DELETE'])
def remove_product():
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'product_id' not in data:
        return jsonify({"Error": "user_id and product_id are required."}), 400

    user_id = data['user_id']
    product_id = data['product_id']

    try:
        success = Cart.remove_from_cart(user_id, product_id)
        if success:
            return jsonify({"Message": "Product removed from cart successfully."}), 200
        else:
            return jsonify({"Error": "Failed to remove product from cart."}), 500
    except Exception as e:
        return jsonify({"Error": str(e)}), 500


@cart_bp.route('/change_rent_status', methods=['PUT'])
def change_rent_status():
    data = request.get_json()
    
    if not data or 'user_id' not in data or 'product_id' not in data or 'on_rent' not in data or 'rent_day' not in data:
        return jsonify({"Error": "user_id, product_id, on_rent, and rent_day are required."}), 400

    user_id = data['user_id']
    product_id = data['product_id']
    on_rent = data['on_rent']
    rent_day = data['rent_day']

    try:
        success = Cart.update_rent_status(user_id=user_id,product_id=product_id, on_rent=on_rent, rent_day=rent_day)
        if success:
            return jsonify({"Message": "Rent status updated successfully."}), 200
        else:
            return jsonify({"Error": "Failed to update rent status."}), 500
    except Exception as e:
        return jsonify({"Error": str(e)}), 500


@cart_bp.route('/change_quantity', methods=['PUT'])
def change_quantity():
    data = request.get_json()
    if not data or 'user_id' not in data or 'product_id' not in data or 'quantity' not in data:
        return jsonify({"Error": "user_id, product_id, and quantity are required."}), 400

    user_id = data['user_id']
    product_id = data['product_id']
    quantity = data['quantity']
    try:
        success = Cart.update_quantity(user_id=user_id, product_id=product_id, quantity=quantity)
        if success:
            return jsonify({"Message": "Quantity updated successfully."}), 200
        else:
            return jsonify({"Error": "Failed to update quantity."}), 500
    except Exception as e:
        return jsonify({"Error": str(e)}), 500


@cart_bp.route('/get_cart', methods=['GET'])
def get_cart():
    user_id = int(request.args.get('user_id'))
    if not user_id:
        return jsonify({"Error": "user_id is required."}), 400
    try:
        cart_items = Cart.get_cart_by_user_id(user_id)
        return jsonify([item.__dict__ for item in cart_items]), 200
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    

