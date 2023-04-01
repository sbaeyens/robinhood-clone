from flask import Blueprint, jsonify, session, request
from app.models import Stock, db, Transaction, Investment, Portfolio, Portfolio_History
from ..forms import TransactionBuyForm, TransactionSellForm
from datetime import datetime
from flask_login import current_user
# from ..utils import to_dict_list, form_errors_obj_list, print_data

portfolio_history_routes = Blueprint('portfolio_history', __name__)

def to_dict_list(data):
    '''
    turn a query into a to_dict list
    '''
    return [item.to_dict() for item in list(data)]

@portfolio_history_routes.route('/')
def get_all_portfolio_history():
    '''
    get a list of a users portfolio history
    '''
    portfolio_id = current_user.to_dict()["portfolio"]["id"]
    history_data = Portfolio_History.query.filter(Portfolio_History.portfolio_id == portfolio_id).order_by(Portfolio_History.id)
    history_list = to_dict_list(history_data)

    print("history_list\n\n\n\n\n", history_list)

    return history_list
