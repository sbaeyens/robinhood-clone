from .db import db, environment, SCHEMA, add_prefix_for_prod

class Investment(db.Model):
    __tablename__ = 'investments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    stock_id = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('stocks.ticker')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)


    ## Relationships ##
    # Many-to-One with Portfolio
    portfolio = db.relationship('Portfolio', back_populates='investments')
    # Many-to-one with Stocks
    stock = db.relationship('Stock', back_populates='investments')


    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'stock_id': self.stock_id,
            'quantity': self.quantity,
        }
