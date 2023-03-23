from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text


def seed_stocks():
    stocks = [
        {'ticker': 'AAPL', 'company_name': 'Apple, Inc.' },
        {'ticker': 'AMZN', 'company_name': 'Amazon.com, Inc.' },
        {'ticker': 'GOOG', 'company_name': 'Alphabet, Inc.' },
    ]

    for stock in stocks:
        db.session.add(Stock(
            ticker=stock['ticker'],
            company_name=stock['company_name']
        ))

    db.session.commit()


## unseed function
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
