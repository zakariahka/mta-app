# app/routes/train_status.py
from flask import Blueprint, jsonify, request
from app.services.mta_service import get_train_status

train_status_bp = Blueprint('train_status', __name__)

@train_status_bp.route('/<line_id>', methods=['GET'])
def train_status(line_id):
    try:
        status = get_train_status(line_id)
        return jsonify(status)
    except ValueError as e:
        response = jsonify({"error": str(e)})
        response.status_code = 400
        return response
    except Exception as e:
        response = jsonify({"error": "An unexpected error occurred."})
        response.status_code = 500
        return response
