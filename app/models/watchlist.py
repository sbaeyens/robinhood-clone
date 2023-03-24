from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates



class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    ## Relationships ##
    # Many-to-One with users
    user = db.relationship("User", back_populates="watchlists")
    # Many-to-Many with stocks via watchlist_stocks
    stocks = db.relationship('Stock', secondary='watchlist_stocks', back_populates='watchlists')
    # watchlist_stocks = db.relationship('Watchlist_Stock', back_populates='watchlist')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'stocks': [stock.to_dict() for stock in self.stocks]
        }
