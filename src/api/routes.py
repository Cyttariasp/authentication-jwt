"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.extensions import bcrypt


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    email = request.json.get("email")
    if email is None:
        return jsonify({"message": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({"message": "User already exists"}), 400

    password = request.json.get("password")
    if password is None:
        return jsonify({"message": "Password is required"}), 400
    elif len(password) < 8:
        return jsonify({"message": "Password must be at least 8 characters"}), 400

    user = User()
    user.email = email
    user.name = request.json.get("name")  
    user.is_active = True


    # hashed password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user.password = hashed_password

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"}), 200