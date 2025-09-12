import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add src directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from src.routes.chat import chat_bp
from src.services.stackspot_auth import stackspot_service

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')

# Enable CORS for all routes
CORS(app, origins="*")

# Register blueprints
app.register_blueprint(chat_bp, url_prefix='/api')

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint for the API"""
    try:
        stackspot_health = stackspot_service.health_check()
        return jsonify({
            'status': 'healthy',
            'service': 'Flask API',
            'stackspot': stackspot_health
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'service': 'Flask API',
            'error': str(e)
        }), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve static files and fallback to index.html for SPA routing"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404
    
    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

