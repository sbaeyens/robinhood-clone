# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Watchlist_Stock(db.Model):
#     __tablename__ = 'watchlist_stocks'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     stock_id = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('stocks.ticker')), nullable=False)
#     watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), nullable=False)


#     ## Relationships ##
#     # Many-to-One with stocks
#     stock = db.relationship('Stock', back_populates='watchlist_stocks')
#     # Many-to-One with watchlists
#     watchlist = db.relationship('Watchlist', back_populates='watchlist_stocks')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'stock_id': self.stock_id,
#             'watchlist_id': self.watchlist_id,
#         }

from .db import db, environment, SCHEMA, add_prefix_for_prod

watchlist_stocks = db.Table(
    'watchlist_stocks',
    db.Column(
        'stock_id',
        db.String(10),
        db.ForeignKey(add_prefix_for_prod('stocks.ticker')),
        primary_key=True
    ),
    db.Column(
        'watchlist_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('watchlists.id'), ondelete='CASCADE'),
        primary_key=True
    )
)

if environment == "production":
    watchlist_stocks.schema = SCHEMA
