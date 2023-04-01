from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models.db import db
from app.models import Watchlist, User
from app.models.watchlist_stock import watchlist_stocks
from app.forms.watchlist_form import WatchlistForm

watchlist_routes = Blueprint('watchlists', __name__)

#get all watchlists by userid
@watchlist_routes.route('/user')
def get_user_watchlists():
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

@watchlist_routes.route("/", methods=["POST"])
def create_new_watchlist():
    res = request.get_json()
    user = current_user.to_dict()

    form = WatchlistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        watchlist = Watchlist(
          user_id=user["id"],
          name=res["name"]
        )
        db.session.add(watchlist)
        db.session.commit()
        return watchlist.to_dict()

@watchlist_routes.route('/<int:id>', methods=['DELETE'])
def delete_watchlist_by_id(id):
    watchlist = Watchlist.query.get(id)

    if not watchlist:
        return "Specified watchlist does not exist"

    db.session.delete(watchlist)
    db.session.commit()
    return "Successfully Deleted"

@watchlist_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_watchlist(id):
    res = request.get_json()
    watchlist = Watchlist.query.get(id)

    watchlist.name = res['name']
    db.session.commit()
    return watchlist.to_dict()
