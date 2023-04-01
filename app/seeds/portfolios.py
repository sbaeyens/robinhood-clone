from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text


def seed_portfolios():
    portfolios = [
        {'owner_id': 1, 'balance': 10000, },
        {'owner_id': 2, 'balance': 20000, },
        {'owner_id': 3, 'balance': 20000, },
    ]

    for portfolio in portfolios:
        db.session.add(Portfolio(
            owner_id=portfolio['owner_id'],
            balance=portfolio['balance'],
        ))

    db.session.commit()


# unseed
def undo_portfolios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
