from flask import Blueprint, jsonify, request

from app.services.email import send_otp_email
from app.models.user import User
import time

mysql = None 
temp_userdata = dict()

def init_auth_blueprint(mysql_instance):
    global mysql
    mysql = mysql_instance

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/all_user", methods=["GET"])
def list_users():
    all_users = User.get_all_users()
    users_list = []
    for user in all_users:
        users_list.append({
            "ID": user.id,
            "Username": user.username,
            "Email": user.email,
            "Created At": user.created_at,
            "Last Login": user.last_login
        })
    
    return jsonify(users_list)

@auth_bp.route("/create_user", methods=['POST'])
def create_user():

    data = request.get_json()
    print(data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')


    # Input validation (example)
    if not username or not email or not password:
        return jsonify({"error": "All fields are required."}), 400
    
    if User.get_user_id_by_username(username=username):
        return jsonify({"error": "Username is already occupied, try again"}), 409
    else:
        otp = send_otp_email(email=email)
        if otp:
            # Store OTP with timestamp
            temp_userdata[otp] = [username, email, password, time.time()]
            return jsonify({"message": "OTP sent successfully."}), 200
        else:
            return jsonify({"error": "Error in generating OTP."}), 500
    

@auth_bp.route("/verify_otp", methods=["POST"])
def verify_otp():
    otp = int(request.get_json().get('otp'))

    if otp in temp_userdata.keys():
        username, email, password, timestamp = temp_userdata[otp]
        

        if time.time() - timestamp > 300:  # 300 seconds = 5 minutes
            del temp_userdata[otp]  # Remove expired OTP
            return jsonify({"error": "OTP has expired. Please request a new one."}), 400
            
        try:
            userid = User.create_user(username=username, email=email, password=password)
            del temp_userdata[otp]  
            return jsonify({"message": "OTP is valid! Proceeding with registration.", "userid": userid}), 200 
        except Exception as e:
            print("Error with database", e)
            return jsonify({"error": "Error with database."}), 500
    else:
        return jsonify({"error": "Invalid OTP. Please try again."}), 400

@auth_bp.route("/login", methods=["POST"])
def login_account():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    val = User.check_user_password(username=username, password=password)
    print(val)
    if val :
        User.update_last_login(username=username)
        userid = User.get_user_id_by_username(username=username)
        return jsonify({"message" :  "Login succesfully ", "userid": userid}), 200
    else:
        return jsonify({"message " : "Login failed, Wrong password"}), 400

       



