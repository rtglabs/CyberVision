from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import bcrypt

app = Flask(__name__)
CORS(app)

DB_PATH = './database/rover.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(stored_password, provided_password):
    # Convert stored password from string to bytes
    stored_password_bytes = stored_password.encode('utf-8')
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password_bytes)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()

    if user and verify_password(user['password'], password):
        return jsonify({'status': 'success', 'message': 'Login successful'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

@app.route('/logs', methods=['POST'])
def store_logs():
    data = request.get_json()
    log_data = data.get('log')

    conn = get_db_connection()
    conn.execute('INSERT INTO logs (log) VALUES (?)', (log_data,))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Log stored successfully'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
