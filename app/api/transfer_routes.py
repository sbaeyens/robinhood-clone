from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db, Transfer
from datetime import datetime
from flask_login import current_user

transfer_routes = Blueprint('transfers', __name__)

#create new transaction
@transfer_routes.route("/", methods=["POST"])
def create_transaction():
    res = request.get_json()
    print("RES from route \n\n\n\n", res )
    transfer = Transfer(
        portfolio_id = res["portfolioID"],
        transfer_type = res["transferType"],
        amount = res["amount"],
        date = datetime.now(),
    )

    db.session.add(transfer)
    db.session.commit()

    return res

#get transactions by ticker
@transfer_routes.route('/')
def get_transfers():
    print("reached 1st print \n\n\n\n")
    user = current_user.to_dict()
    print("reached 2nd print \n\n\n\n")
    portfolio_id = user["portfolio"]["id"]

    transaction_data = Transfer.query.filter(
        Transfer.portfolio_id == portfolio_id
        ).order_by(Transfer.date)

    print("transaction_data \n\n\n\n\n", transaction_data)
    transfer_list = [item.to_dict() for item in list(transaction_data)]

    return transfer_list
