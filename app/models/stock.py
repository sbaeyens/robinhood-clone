from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    ticker = db.Column(db.String(10), primary_key=True, nullable=False)
    company_name = db.Column(db.String(50), nullable=False)

    ## Relationships ##
    # Many-to-Many with Watchlists
    watchlists = db.relationship('Watchlist', secondary='watchlist_stocks', back_populates='stocks')
    # watchlist_stocks = db.relationship('Watchlist_Stock', back_populates='stock')
    # One-to-Many with Transaction
    transactions = db.relationship('Transaction', back_populates='stock')
    # One-to-Many with Investment
    investments = db.relationship('Investment', back_populates='stock')



    def to_dict(self):
        return {
            'ticker': self.ticker,
            'company_name': self.company_name,
        }
