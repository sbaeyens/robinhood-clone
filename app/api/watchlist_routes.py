from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models.db import db
from app.models import Watchlist, User
from app.models.watchlist_stock import watchlist_stocks

watchlist_routes = Blueprint('watchlists', __name__)

#get all watchlists by userid
@watchlist_routes.route('/user/<int:userId>')
def get_user_watchlists(userId):
    print("TEST INSIDE ROUTE\n\n\n\n\n")
    user = current_user.to_dict()
    print("USER \n\n\n\n\n", user)


    ## example from etsy project
    # data = Purchase.query.filter(Purchase.user_id == user["id"])

    watchlists = Watchlist.query.filter_by(user_id=user["id"]).all()
    print("watchlist \n\n\n\n\n", watchlists[0].to_dict())
    if len(watchlists) > 0:
        watchlist_data = [watchlist.to_dict() for watchlist in watchlists]
        return jsonify(watchlist_data)
    else:
        return jsonify([])
