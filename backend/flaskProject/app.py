import binascii
import hashlib
import os
import json
import string
from datetime import datetime, date
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from flask_caching import Cache

app = Flask(__name__)
CORS(app)

users = {}
nonces = {}

@app.route('/api/data', methods=['GET'])
def get_data():
    current_time = datetime.now()
    time_str = current_time.strftime("%Y-%m-%d %H:%M:%S")

    # Tworzenie obiektu Response z zawartością i status code
    response = Response(time_str, status=200)

    # Dodawanie nagłówków
    response.headers['Content-Type'] = 'text/plain'  # Typ zawartości
    response.headers['Cache-Control'] = 'public, max-age=10'  # Cache na 1 godzinę

    return response

@app.route('/get-nonce/<username>', methods=['GET'])
def get_key(username):
    if not username:
        return jsonify({"message": "Username is required"}), 400

    if username not in users:
        return jsonify({"message": "Username does not exist"}), 400

    nonce = os.urandom(16).hex()
    nonces[username] = nonce
    return jsonify({"nonce": nonce})

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if username in users:
        return jsonify({"message": "Username already exists"}), 409

    print(password)
    users[username] = {
        "password": password
    }

    return jsonify({"message": "Registration successful", "user": username}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    received_hash = data.get("password")

    if not username or not received_hash:
        return jsonify({"message": "Username and password are required"}), 400

    user = users.get(username)
    if not user:
        return jsonify({"message": "User not found"}), 404

    nonce = nonces.pop(username, None)
    if not nonce:
        return jsonify({"message": "Nonce not found or expired"}), 400

    # Recreate the hash using the stored password hash and the nonce
    print(nonce + user['password'])
    validated_hash = hashlib.md5((nonce + user['password']).encode()).hexdigest()
    print(validated_hash)
    if validated_hash != received_hash:
        return jsonify({"message": "Invalid password"}), 400

    return jsonify({"message": "Login successful", "user": username}), 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)
