from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class BuySellForm(FlaskForm):
    shares = IntegerField('Shares', validators=[DataRequired()])
