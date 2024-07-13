from flask import Blueprint, jsonify
from app.services.mta_service import get_train_status

train_status_bp = Blueprint('train_status', __name__)

@train_status_bp.route('/<line_id>', methods=['GET'])
def train_status(line_id):
    status = get_train_status(line_id)
    return jsonify(status)
