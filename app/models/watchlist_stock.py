from .db import db, SCHEMA, environment, add_prefix_for_prod

watchlist_stocks = db.Table(
    'watchlist_stocks',
    db.Model.metadata,
    db.Column('watchlist_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod("watchlists.id")), primary_key=True),
    db.Column('ticker', db.String, db.ForeignKey(
        add_prefix_for_prod("stocks.ticker")), primary_key=True)
)

if environment == "production":
    watchlist_stocks.schema = SCHEMA
