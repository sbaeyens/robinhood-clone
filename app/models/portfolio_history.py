from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates

class Portfolio_History(db.Model):
    __tablename__ = 'portfolio_histories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    value_at_time = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, nullable=False)


    ## Relationships ##
    # Many-to-One Relationship with Portfolio
    portfolio = db.relationship("Portfolio", back_populates="portfolio_histories")


    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'value_at_time': self.value_at_time,
            'date': self.date,
        }
