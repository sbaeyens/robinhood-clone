from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('transactions', __name__)
