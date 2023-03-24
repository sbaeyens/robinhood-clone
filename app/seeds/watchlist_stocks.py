from app.models import db, environment, SCHEMA
from app.models.watchlist_stock import watchlist_stocks
from sqlalchemy import insert



from sqlalchemy.sql import text

def seed_watchlist_stocks():

    watchlist_stock_data = [
        {'watchlist_id': 1, 'ticker': 'GOOG'},
        {'watchlist_id': 1, 'ticker': 'AAPL'},
        {'watchlist_id': 2, 'ticker': 'AMZN'},
        {'watchlist_id': 2, 'ticker': 'GOOG'},
        {'watchlist_id': 3, 'ticker': 'AMZN'},
        {'watchlist_id': 4, 'ticker': 'GOOG'},
    ]

    for data in watchlist_stock_data:
        stock = insert(watchlist_stocks).values(
            watchlist_id = data['watchlist_id'],
            ticker = data['ticker']
        )
        db.session.execute(stock)

    # Commit the changes to the database
    db.session.commit()


def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
