from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('transactions', __name__)
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Transaction
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user


transaction_routes = Blueprint('transactions', __name__)

#get transactions by ticker
@transaction_routes.route('/<string:ticker>')
def get_transactions_by_ticker(ticker):

    user = current_user.to_dict()
    portfolio_id = user["portfolio"]["id"]

    transaction_data = Transaction.query.filter(Transaction.portfolio_id == portfolio_id).order_by(Transaction.id.desc())
    transaction_list = [item.to_dict() for item in list(transaction_data)]

    return transaction_list




#buy stock
@transaction_routes.route('/<string:ticker>', methods=["POST"])
def buy_stock(ticker):
    '''
    write a new stock purchase to the transaction table
    '''
    user = current_user.to_dict()
    portfolio_id = user["portfolio"]["id"]
    res = request.get_json()

    if res["type"] == "buy":
        form = TransactionBuyForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
    else:
        form = TransactionSellForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        transaction = Transaction(
            stock_id=ticker,
            portfolio_id=portfolio_id,
            price_at_time=res["price"],
            total_expense=res["total_cost"],
            quantity=res["shares"],
            type=res["type"],
            date=datetime.now()
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
