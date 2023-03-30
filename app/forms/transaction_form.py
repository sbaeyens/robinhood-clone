from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField
from wtforms.validators import DataRequired


class TransactionBuyForm(FlaskForm):
    shares = IntegerField('Shares', validators=[DataRequired()])
    total_cost = DecimalField('Total Credit', places=2, validators=[DataRequired()])

class TransactionSellForm(FlaskForm):
    shares = IntegerField('Shares', validators=[DataRequired()])
    total_cost = DecimalField('Total Credit', places=2, validators=[DataRequired()])
