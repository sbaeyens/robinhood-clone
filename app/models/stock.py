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
    watchlist = db.relationship('Watchlist', secondary='watchlist_stocks', back_populates='stock')
    watchlist_stock = db.relationship('Watchlist_Stock', back_populates='stock')
    # One-to-Many with Transaction
    transaction = db.relationship('Transaction', back_populates='stock')
    # One-to-Many with Investment
    investment = db.relationship('Investment', back_populates='stock')



    def to_dict(self):
        return {
            'ticker': self.ticker,
            'company_name': self.company_name,
        }
