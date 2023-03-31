from .db import db, environment, SCHEMA, add_prefix_for_prod


class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    stock_id = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('stocks.ticker')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_at_time = db.Column(db.Integer, nullable=False)
    transaction_type = db.Column(db.String, nullable=False)
    total_expense = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    ## Relationships ##
    # Many-to-One with Portfolio
    portfolio = db.relationship('Portfolio', back_populates='transactions')
    # Many-to-One between Transaction and Stock
    stock = db.relationship('Stock', back_populates='transactions')


    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'stock_id': self.stock_id,
            'quantity': self.quantity,
            'price_at_time': self.price_at_time,
            'transaction_type': self.transaction_type,
            'total_expense': self.total_expense,
            'date': self.date,
        }
