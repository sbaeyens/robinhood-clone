from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Portfolio, db

portfolio_routes = Blueprint('portfolio', __name__)

# get portfolio
@portfolio_routes.route('/')
def get_user_portfolio():
    portfolio = Portfolio.query.get(current_user.id)
    return portfolio.to_dict()


# update buying power after purchase/sale
@portfolio_routes.route('/', methods=["PUT"])
def update_portfolio():

    res = request.get_json()
    user = current_user.to_dict()
    portfolio = Portfolio.query.get(user["portfolio"]["id"])

    if res["transaction_type"] == "Buy":
        portfolio.balance = portfolio.balance - res["total_expense"]
        db.session.commit()
    else:
        portfolio.balance = portfolio.balance + res["total_expense"]
        db.session.commit()

    return portfolio.to_dict()
