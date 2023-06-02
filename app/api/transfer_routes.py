from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db, Transfer
from datetime import datetime


transfer_routes = Blueprint('transfers', __name__)

#create new transaction
@transfer_routes.route("/", methods=["POST"])
def create_transaction():
    res = request.get_json()
    print("RES from route \n\n\n\n", res )
    transfer = Transfer(
        portfolio_id = 1,
        transfer_type = "deposit",
        amount = 5000,
        date = datetime.now(),
    )

    db.session.add(transfer)
    db.session.commit()

    return res
