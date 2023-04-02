from app.models import db, Investment, SCHEMA, environment
from sqlalchemy.sql import text

def seed_investments():
    i1 = Investment(
        portfolio_id= 1,
        stock_id= "GOOG",
        quantity= 1,
    )

    i2 = Investment(
        portfolio_id= 1,
        stock_id= "AAPL",
        quantity= 2,
    )

    i3 = Investment(
        portfolio_id= 1,
        stock_id= "AMZN",
        quantity= 3,
    )

    i4 = Investment(
        portfolio_id= 2,
        stock_id= "AMZN",
        quantity= 4,
    )

    i5 = Investment(
        portfolio_id= 2,
        stock_id= "AAPL",
        quantity= 3,
    )

    i6 = Investment(
        portfolio_id= 3,
        stock_id= "AMZN",
        quantity= 2,
    )

    i7 = Investment(
        portfolio_id= 3,
        stock_id= "GOOG",
        quantity= 5,
    )



    all_investments = [i1, i2, i3, i4, i5, i6, i7]
    add_investments = [db.session.add(investment) for investment in all_investments]
    db.session.commit()


## unseed function
def undo_investments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.investments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM investments")

    db.session.commit()
