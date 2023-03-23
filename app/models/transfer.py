from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates

class Transfer(db.Model):
    __tablename__ = 'transfers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    transfer_type = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    ## Relationships ##
    # Many-to-One Relationship with Portfolio
    portfolio = db.relationship("Portfolio", back_populates="transfers")


    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'transfer_type': self.transfer_type,
            'amount': self.amount,
            'date': self.date,
        }
