from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Retrieve environment variables
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise ValueError("SUPABASE_URL or SUPABASE_KEY environment variables are not set")

# Create Supabase client
supabase: Client = create_client(url, key)

@app.route('/save_location', methods=['POST'])
def save_location():
    try:
        data = request.get_json()
        latitude = data.get('latitude')
        longitude = data.get('longitude')

        if latitude is None or longitude is None:
            return jsonify({'error': 'Latitude and longitude are required'}), 400

        # Insert location into Supabase
        insert_response = supabase.table('users').insert({'latitude': latitude, 'longitude': longitude}).execute()

        if hasattr(insert_response, 'error') and insert_response.error:
            return jsonify({'error': 'Failed to save location', 'details': insert_response.error.message}), 500

        # Determine the region for the coordinates
        region_response = supabase.table('regions').select('id', 'name').filter(
            'min_lat', 'lte', latitude
        ).filter(
            'max_lat', 'gte', latitude
        ).filter(
            'min_lon', 'lte', longitude
        ).filter(
            'max_lon', 'gte', longitude
        ).execute()

        if hasattr(region_response, 'error') and region_response.error:
            return jsonify({'error': 'Failed to determine region', 'details': region_response.error.message}), 500

        if not region_response.data:
            return jsonify({'error': 'Region not found'}), 404

        region = region_response.data[0]

        return jsonify({
            'message': 'Location saved',
            'latitude': latitude,
            'longitude': longitude,
            'region': region['name']
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_crops_for_region', methods=['POST'])
def get_crops_for_region():
    try:
        data = request.get_json()
        region_name = data.get('region_name')

        if not region_name:
            return jsonify({'error': 'Region name is required'}), 400

        # Determine the region ID based on the region name
        region_response = supabase.table('regions').select('id').filter('name', 'eq', region_name).execute()

        if hasattr(region_response, 'error') and region_response.error:
            return jsonify({'error': 'Failed to determine region ID', 'details': region_response.error.message}), 500

        if not region_response.data:
            return jsonify({'error': 'Region not found'}), 404

        region_id = region_response.data[0]['id']

        # Retrieve crop IDs for the region
        crops_ids_response = supabase.table('crops_regions').select('crop_id').filter('region_id', 'eq', region_id).execute()

        if hasattr(crops_ids_response, 'error') and crops_ids_response.error:
            return jsonify({'error': 'Failed to retrieve crop IDs', 'details': crops_ids_response.error.message}), 500

        crop_ids = [item['crop_id'] for item in crops_ids_response.data]

        # Retrieve crop details for the crop IDs
        if crop_ids:
            crops_response = supabase.table('crops').select('*').in_('id', crop_ids).execute()

            if hasattr(crops_response, 'error') and crops_response.error:
                return jsonify({'error': 'Failed to retrieve crops', 'details': crops_response.error.message}), 500
        else:
            crops_response = {'data': []}

        return jsonify({
            'region': region_name,
            'crops': crops_response.data
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
