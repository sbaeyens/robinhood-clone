from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User

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

    transaction_data = Transaction.query.filter(
        Transaction.portfolio_id == portfolio_id,
        Transaction.stock_id == ticker
        ).order_by(Transaction.id)
    # transaction_data = Transaction.query.filter(Transaction.portfolio_id == portfolio_id).order_by(Transaction.id.desc())
    transaction_list = [item.to_dict() for item in list(transaction_data)]

    return transaction_list



#buy stock
@transaction_routes.route('/<string:ticker>', methods=["POST"])
def buy_stock(ticker):

    user = current_user.to_dict()
    portfolio_id = user["portfolio"]["id"]
    res = request.get_json()

    if res["transaction_type"] == "Buy":
        form = TransactionBuyForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
    else:
        form = TransactionSellForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        transaction = Transaction(
            stock_id=ticker,
            portfolio_id=portfolio_id,
            price_at_time=res["price_at_time"],
            total_expense=res["total_expense"],
            quantity=res["quantity"],
            transaction_type=res["transaction_type"],
            date=datetime.now()
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()


# @transaction_routes.route('/unauthorized')
# def unauthorized():
#     """
#     Returns unauthorized JSON when flask-login authentication fails
#     """
#     return {'errors': ['Unauthorized']}, 401
