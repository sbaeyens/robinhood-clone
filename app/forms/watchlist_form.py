from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class WatchlistForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
