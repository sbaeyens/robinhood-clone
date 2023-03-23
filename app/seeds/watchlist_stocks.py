from app.models import db, environment, SCHEMA, Watchlist_Stock
from sqlalchemy.sql import text

def seed_watchlist_stocks():

    watchlist_stock_data = [
        {'watchlist_id': 1, 'stock_id': 'GOOG'},
        {'watchlist_id': 1, 'stock_id': 'AAPL'},
        {'watchlist_id': 2, 'stock_id': 'AMZN'},
        {'watchlist_id': 2, 'stock_id': 'GOOG'},
        {'watchlist_id': 3, 'stock_id': 'AMZN'},
        {'watchlist_id': 4, 'stock_id': 'GOOG'},
    ]

    for stock in watchlist_stock_data:
        db.session.add(Watchlist_Stock(
            watchlist_id=stock['watchlist_id'],
            stock_id=stock['stock_id']
        ))

    db.session.commit()


def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
