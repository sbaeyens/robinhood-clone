from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():
    watchlist1 = Watchlist(
        user_id = 1,
        name = "Big Tech"
    )

    watchlist2 = Watchlist(
        user_id = 1,
        name = "Good Stocks"
    )

    watchlist3 = Watchlist(
        user_id = 2,
        name = "My List"
    )

    watchlist4 = Watchlist(
        user_id = 2,
        name = "Big Tech"
    )


    all_watchlists = [watchlist1, watchlist2, watchlist3, watchlist4 ]

    for watchlist in all_watchlists:
        db.session.add(watchlist)

    db.session.commit()


## unseed function
def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
