from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Retrieve environment variables
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

# Check if the environment variables are set
if not url or not key:
    raise ValueError("SUPABASE_URL or SUPABASE_KEY environment variables are not set")

# Create Supabase client
supabase: Client = create_client(url, key)
print(f"SUPABASE_URL: {url}")
print(f"SUPABASE_KEY: {key}")

@app.route('/')
def index():
    return 'Hello, from the backend'

@app.route('/save_location', methods=['POST'])
def save_location():
    try:
        data = request.get_json()
        latitude = data.get('latitude')
        longitude = data.get('longitude')

        if not latitude or not longitude:
            return jsonify({
                'error': 'Latitude and longitude are required'
            }), 400

        response = supabase.table('users').insert({'latitude': latitude, 'longitude': longitude}).execute()

        if response.error:
            error_message = response.error.message if response.error.message else 'Unknown error'
            return jsonify({
                'error': 'Failed to save location',
                'details': error_message
            }), 500

        return jsonify({
            'message': 'Location saved',
            'latitude': latitude,
            'longitude': longitude
        }), 201
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
