from flask import Blueprint, jsonify, request
from app.models.product import Product


mysql = None 
temp_userdata = dict()

def init_product_blueprint(mysql_instance):
    global mysql
    mysql = mysql_instance

def formating_product(all_product):
    product_list = []
    for product in all_product:
        product_list.append({
            "product_id": product.product_id,
            "product_name": product.product_name,
            "img_url": product.img_url,
            "short_description": product.short_description,
            "long_description": product.long_description,
            "market_price": product.market_price,
            "discounted_price" : product.discounted_price,
            "is_rent": product.is_rent,
            "apply_charity": product.apply_charity,
            "product_rating": product.product_rating,
            "available_quantity" : product.available_quantity,
        })
    return product_list

product_bp = Blueprint("product", __name__)


@product_bp.route("/all_products", methods=["GET"])
def all_product():
    all_product = Product.get_all_products()
    return jsonify(formating_product(all_product)) 
    
@product_bp.route("/get_product_id_by_name", methods=["POST"])
def get_product_id():
    product_name = str(request.get_json().get("product_name"))
    try:
        product_id = Product.get_product_id_by_product_name(product_name=product_name)
        return jsonify({ "product_id" : product_id})
    
    except Exception as e:
        return jsonify( {"Error" : str(e) })

@product_bp.route("/all_charity_products", methods=['GET'])
def all_charity_products():
    charity_product = Product.get_all_products_charity()
    return jsonify(formating_product(charity_product))

@product_bp.route("/insert_data", methods=['POST'])
def insert_data():
    data = request.get_json()

    # Validate input data
    required_fields = ['product_name', 'img_url', 'short_description', 'long_description', 
                       'market_price', 'discounted_price', 'is_rent', 'apply_charity', 
                       'product_rating', 'available_quantity']
    
    for field in required_fields:
        if field not in data:
            return jsonify({"Error": f"{field} is required"}), 400  # Bad Request

    # Extract data from the request
    product_name = data.get('product_name')
    img_url = data.get('img_url')
    short_description = data.get('short_description')
    long_description = data.get('long_description')
    market_price = data.get('market_price')
    discounted_price = data.get('discounted_price')
    is_rent = data.get('is_rent')
    apply_charity = data.get('apply_charity')
    product_rating = data.get('product_rating')
    available_quantity = data.get('available_quantity')

    # Typecast is_rent to an integer (0 or 1)
    if isinstance(is_rent, bool):
        is_rent = int(is_rent)  
    elif isinstance(is_rent, int):
        if is_rent not in (0, 1):
            return jsonify({"Error": "is_rent must be 0 or 1"}), 400  # Bad Request
    else:
        return jsonify({"Error": "is_rent must be a boolean or an integer (0 or 1)"}), 400  # Bad Request

    try:
        # Call the insert_product method to insert the product into the database
        product_id = Product.insert_product(
            product_name=product_name,
            img_url=img_url,
            short_description=short_description,
            long_description=long_description,
            market_price=market_price,
            discounted_price=discounted_price,
            is_rent=is_rent,
            apply_charity=apply_charity,
            product_rating=product_rating,
            available_quantity=available_quantity
        )
        
        return jsonify({"message": "Product inserted successfully", "product_id": product_id}), 201  # Created

    except Exception as e:
        return jsonify({"Error": str(e)}), 500  # Internal Server Error

@product_bp.route("/get_product/<int:product_id>", methods=['GET'])
def get_product_by_id(product_id):
    data = Product.get_product_by_product_id(product_id=product_id)
    if data is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(formating_product([data])[0])

@product_bp.route("/change_quantity", methods=['PUT'])
def change_quantity():
    data = request.get_json()
    product_id = data.get("product_id")
    qunatity = data.get('quantity')

    data = Product.get_product_by_product_id(product_id)

    if data:
        if data.available_quantity >= qunatity:
            new_quantity = data.available_quantity - qunatity
            result = Product.update_available_quantity(product_id, new_quantity)
            return {"message": "Available quantity updated successfully"}, 200
        else:
            return {"message": "not available in required quantity", "product_remain" : data.available_quantity}, 404
    else:
        return {"message" : "product not defined or invalid id"}



        



    
    