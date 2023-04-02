from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_transactions():
    transactions = [
        {'portfolio_id': 1, 'stock_id': 'AAPL', 'quantity': 2, 'transaction_type': 'Buy', 'price_at_time': 30.50, 'total_expense':70.00, 'date':datetime(2023, 1, 21)},
        {'portfolio_id': 1, 'stock_id': 'AMZN', 'quantity': 3, 'transaction_type': 'Buy', 'price_at_time': 5.00, 'total_expense':15.00, 'date':datetime(2023, 2, 15)},
        {'portfolio_id': 1, 'stock_id': 'GOOG', 'quantity': 5, 'transaction_type': 'Buy', 'price_at_time': 10.00, 'total_expense':50.00, 'date':datetime(2023, 2, 15)},
        {'portfolio_id': 1, 'stock_id': 'GOOG', 'quantity': 4, 'transaction_type': 'Sell', 'price_at_time': 20.00, 'total_expense':40.00, 'date':datetime(2023, 3, 10)},

    ]

    for transaction in transactions:
        db.session.add(Transaction(
            portfolio_id=transaction['portfolio_id'],
            stock_id=transaction['stock_id'],
            quantity=transaction['quantity'],
            price_at_time=transaction['price_at_time'],
            transaction_type=transaction['transaction_type'],
            total_expense=transaction['total_expense'],
            date=transaction['date']
        ))

    db.session.commit()

# undo seeders
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
