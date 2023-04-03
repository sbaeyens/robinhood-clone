from flask import Blueprint, jsonify, session, request
from app.models import Stock, Watchlist, db
from flask_login import current_user
from sqlalchemy import insert, delete
from app.models.watchlist_stock import watchlist_stocks

# from ..utils import to_dict_list, form_errors_obj_list, current_user_portfolio, print_data

watchlists_stocks_routes = Blueprint('watchlists_stocks', __name__)


@watchlists_stocks_routes.route("/", methods=["POST"])
def add_stock_to_list():

    res = request.get_json()

    for addInfo in res:
        added_stock = insert(watchlist_stocks).values(
            watchlist_id=int(addInfo["watchlistId"]),
            ticker=addInfo["ticker"]
        )
        print("REACHED BACKEND ROUTE\n\n\n\n\n", added_stock)
        db.session.execute(added_stock)

    db.session.commit()

    return {"Response": "Successfully added stocks to watchlist(s)"}
