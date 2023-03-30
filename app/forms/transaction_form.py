from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField
from wtforms.validators import DataRequired


class TransactionBuyForm(FlaskForm):
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    total_expense = DecimalField('Total Expense', places=2, validators=[DataRequired()])

class TransactionSellForm(FlaskForm):
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    total_expense = DecimalField('Total Expense', places=2, validators=[DataRequired()])
