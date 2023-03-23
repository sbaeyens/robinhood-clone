from app.models import db, Transfer, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_transfers():
    portfolios = [
        {'portfolio_id': 1, 'transfer_type': 'deposit', 'amount': 200, 'date':datetime(2023, 1, 2) },
        {'portfolio_id': 1, 'transfer_type': 'deposit', 'amount': 100, 'date':datetime(2023, 1, 20) },
        {'portfolio_id': 1, 'transfer_type': 'withdrawal', 'amount': 1000, 'date':datetime(2023, 2, 20) },
        {'portfolio_id': 1, 'transfer_type': 'withdrawal', 'amount': 500, 'date':datetime(2023, 3, 20) },

    ]

    for portfolio in portfolios:
        db.session.add(Transfer(
            portfolio_id=portfolio['portfolio_id'],
            transfer_type=portfolio['transfer_type'],
            amount=portfolio['amount'],
            date=portfolio['date'],
        ))

    db.session.commit()


# unseed
def undo_transfers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transfers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transfers"))

    db.session.commit()
