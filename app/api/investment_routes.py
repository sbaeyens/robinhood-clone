from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment, Portfolio
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user

investment_routes = Blueprint('investments', __name__)

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
