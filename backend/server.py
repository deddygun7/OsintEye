from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Mock Telegram data
TELEGRAM_MOCK_DATA = {
    'username': None,
    'id': None,
    'details': {}
}

def search_telegram(query):
    """Search Telegram by username or ID"""
    try:
        # Remove @ if present
        query = query.lstrip('@')
        
        # Mock data - in production, integrate with Telegram API or scraping tools
        mock_users = {
            'durov': {
                'username': '@durov',
                'id': 13145160,
                'first_name': 'Pavel',
                'last_name': 'Durov',
                'bio': 'Founder of Telegram',
                'followers': 1500000,
                'is_bot': False,
                'verified': True,
                'profile_photo': 'https://t.me/durov',
                'last_seen': '2 hours ago'
            },
            '123456789': {
                'username': '@unknown_user',
                'id': 123456789,
                'first_name': 'John',
                'last_name': 'Doe',
                'bio': 'Telegram user',
                'followers': 145,
                'is_bot': False,
                'verified': False,
                'profile_photo': None,
                'last_seen': 'recently'
            }
        }
        
        # Search by username or ID
        user_data = mock_users.get(query) or mock_users.get(query.lower())
        
        if user_data:
            return {
                'telegram': {
                    'username': user_data['username'],
                    'id': user_data['id'],
                    'details': {
                        'first_name': user_data.get('first_name'),
                        'last_name': user_data.get('last_name'),
                        'bio': user_data.get('bio'),
                        'followers': user_data.get('followers'),
                        'is_bot': user_data.get('is_bot'),
                        'verified': user_data.get('verified'),
                        'last_seen': user_data.get('last_seen')
                    }
                }
            }
        else:
            return {'error': 'Telegram user not found'}
    except Exception as e:
        return {'error': f'Telegram search failed: {str(e)}'}

def search_coordinates(query):
    """Search by coordinates"""
    try:
        # Parse coordinates
        coords = query.split(',')
        if len(coords) != 2:
            return {'error': 'Invalid coordinates format. Use: lat,lng'}
        
        lat, lng = float(coords[0].strip()), float(coords[1].strip())
        
        return {
            'location': f'Location at {lat}, {lng}',
            'address': 'Mock address from coordinates',
            'nearby': ['Landmark 1', 'Landmark 2', 'Landmark 3'],
            'details': {
                'latitude': lat,
                'longitude': lng,
                'timezone': 'UTC',
                'elevation': '0m'
            }
        }
    except Exception as e:
        return {'error': f'Coordinate search failed: {str(e)}'}

def search_phone(query):
    """Search by phone number"""
    return {
        'phone': query,
        'details': {
            'country': 'USA',
            'provider': 'Verizon',
            'valid': True,
            'type': 'Mobile',
            'location': 'New York, NY'
        }
    }

def search_address(query):
    """Search by address"""
    return {
        'address': query,
        'details': {
            'coordinates': '40.7128,-74.0060',
            'type': 'Residential',
            'residents': '8-12 people'
        }
    }

def search_vehicle(query):
    """Search by vehicle plate/VIN"""
    return {
        'plate': query,
        'details': {
            'model': 'Toyota Camry 2020',
            'year': 2020,
            'color': 'Silver',
            'owner': 'Mock Owner',
            'region': 'New York'
        }
    }

def search_person(query):
    """Search by name or email"""
    return {
        'name': query,
        'details': {
            'email': f'{query}@example.com',
            'phone': '+1-555-123-4567',
            'location': 'New York, NY',
            'profiles': ['LinkedIn', 'Facebook', 'Twitter']
        }
    }

@app.route('/api/search', methods=['POST'])
def search():
    """Main search endpoint"""
    data = request.json
    search_type = data.get('type')
    query = data.get('query')
    
    if not search_type or not query:
        return jsonify({'error': 'Missing type or query'}), 400
    
    if search_type == 'telegram':
        result = search_telegram(query)
    elif search_type == 'coordinates':
        result = search_coordinates(query)
    elif search_type == 'phone':
        result = search_phone(query)
    elif search_type == 'address':
        result = search_address(query)
    elif search_type == 'vehicle':
        result = search_vehicle(query)
    elif search_type == 'person':
        result = search_person(query)
    else:
        return jsonify({'error': 'Invalid search type'}), 400
    
    return jsonify(result)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='127.0.0.1')
