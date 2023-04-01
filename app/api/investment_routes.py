from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment, Portfolio
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user

investment_routes = Blueprint('investments', __name__)

def to_dict_list(data):
    '''
    turn a query into a to_dict list
    '''
    return [item.to_dict() for item in list(data)]

# get all investments by user
@investment_routes.route("/")
def get_current_user_investments():

    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    investment_data = Investment.query.filter(Investment.portfolio_id == portfolio_id).order_by(Investment.id.desc())

    investment_list = to_dict_list(investment_data)

    return investment_list

# get investment by ticker
@investment_routes.route("/<string:ticker>")
def get_investment_by_ticker(ticker):

    # user = current_user.to_dict()
    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    investment_data = Investment.query.filter(
        Investment.portfolio_id == portfolio_id,
        Investment.stock_id == ticker.upper()
        ).first()

    if investment_data:
        investment = investment_data.to_dict()
        return investment
    else:
        return {"error": "You do not own this stock"}


# post new investment
@investment_routes.route('/<string:ticker>', methods=["POST"])
def new_investment(ticker):
    print("inside POST route \n\n\n\n\n")

    user = current_user.to_dict()
    portfolio_id = user["portfolio"]["id"]
    res = request.get_json()


    investment = Investment(
        stock_id=ticker,
        portfolio_id=portfolio_id,
        quantity=res["quantity"]
    )
    db.session.add(investment)
    db.session.commit()
    return investment.to_dict()

#edit existing investment
@investment_routes.route('/<string:ticker>', methods=["PUT"])
def edit_investment(ticker):
    print("inside EDIT route \n\n\n\n\n")

    # user = current_user.to_dict()
    # portfolio_id = user["portfolio"]["id"]
    res = request.get_json()
    portfolio_id = current_user.to_dict()["portfolio"]["id"]


    print("portfolio_id\n\n\n\n\n", portfolio_id)
    print("ticker\n\n\n\n\n", ticker)

    investment = Investment.query.filter(
        Investment.portfolio_id == portfolio_id,
        Investment.stock_id == ticker
        ).first()
    print("found existing investment\n\n\n\n", investment)

    if res["transaction_type"] == "Buy":
        investment.quantity = investment.quantity + res["quantity"]
        db.session.commit()
    else:
        investment.quantity = investment.quantity - res["quantity"]
        db.session.commit()

    return investment.to_dict()

#delete route
@investment_routes.route("/<string:ticker>", methods=["DELETE"])
def delete_investment(ticker):


    portfolio_id = current_user.to_dict()["portfolio"]["id"]

    investment = Investment.query.filter(
        Investment.portfolio_id == portfolio_id,
        Investment.stock_id == ticker
        ).first()

    db.session.delete(investment)
    db.session.commit()

    return {"Response": f"Successfully sold all shares of {ticker}"}
