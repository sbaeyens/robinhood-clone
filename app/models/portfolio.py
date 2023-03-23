from .db import db, environment, SCHEMA, add_prefix_for_prod

class Portfolio(db.Model):
    __tablename__ = "portfolios"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    balance = db.Column(db.Float, nullable=False)

    ##  Relationships ##
    # One-to-One with User
    user = db.relationship('User', uselist=False, back_populates='portfolio')
    # One-to-Many with Transfers
    transfers = db.relationship("Transfer", back_populates="portfolio")
    # One-to-Many with Portfolio_History
    portfolio_histories = db.relationship("Portfolio_History", back_populates="portfolio")
    # One-to-Many with Transaction
    transactions = db.relationship('Transaction', back_populates='portfolio')
    # One-to-Many with Investment
    investments = db.relationship('Investment', back_populates='portfolio')


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'balance': self.balance,
        }
