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
