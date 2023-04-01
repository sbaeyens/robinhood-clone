from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text


def seed_stocks():
    stocks = [
        {"ticker": "TSLA", "company_name": "Tesla"},
        {"ticker": "AAPL", "company_name": "Apple"},
        {"ticker": "AMZN", "company_name": "Amazon.com"},
        {"ticker": "MSFT", "company_name": "Microsoft Corp"},
        {"ticker": "NVDA", "company_name": "NVIDIA Corp."},
        {"ticker": "GOOG", "company_name": "Alphabet"},
        {"ticker": "PEP", "company_name": "PepsiCo"},
        {"ticker": "COST", "company_name": "Costco Wholesale Corp"},
        {"ticker": "CMCSA", "company_name": "Comcast Corp"},
        {"ticker": "ADBE", "company_name": "Adobe"},
        {"ticker": "TXN", "company_name": "Texas Instruments"},
        {"ticker": "AVGO", "company_name": "Broadcom"},
        {"ticker": "HON", "company_name": "Honeywell International"},
        {"ticker": "INTC", "company_name": "Intel Corp"},
        {"ticker": "TMUS", "company_name": "T-Mobile US"},
        {"ticker": "SBUX", "company_name": "Starbucks Corp."},
        {"ticker": "NFLX", "company_name": "Netflix"},
        {"ticker": "QCOM", "company_name": "QUALCOMM"},
        {"ticker": "AMD", "company_name": "Advanced Micro Devices"},
        {"ticker": "CSCO", "company_name": "Cisco Systems"},
        {"ticker": "INTU", "company_name": "Intuit"},
        {"ticker": "AMGN", "company_name": "Amgen"},
        {"ticker": "AMAT", "company_name": "Applied Materials"},
        {"ticker": "GILD", "company_name": "Gilead Sciences"},
        {"ticker": "MDLZ", "company_name": "Mondelez International"},
        {"ticker": "ADI", "company_name": "Analog Devices"},
        {"ticker": "ADP", "company_name": "Automatic Data Processing"},
        {"ticker": "ISRG", "company_name": "Intuitive Surgical"},
        {"ticker": "REGN", "company_name": "Regeneron Pharmaceuticals"},
        {"ticker": "PYPL", "company_name": "PayPal Holdings"},
        {"ticker": "VRTX", "company_name": "Vertex Pharmaceuticals "},
        {"ticker": "FISV", "company_name": "Fiserv"},
        {"ticker": "LRCX", "company_name": "Lam Research Corp"},
        {"ticker": "ATVI", "company_name": "Activision Blizzard"},
        {"ticker": "MU", "company_name": "Micron Technology"},
        {"ticker": "MELI", "company_name": "MercadoLibre"},
        {"ticker": "CSX", "company_name": "CSX Corp"},
        {"ticker": "PANW", "company_name": "Palo Alto Networks"},
        {"ticker": "MRNA", "company_name": "Moderna "},
        {"ticker": "SNPS", "company_name": "Synopsys "},
        {"ticker": "ASML", "company_name": "ASML Holding NV"},
        {"ticker": "CDNS", "company_name": "Cadence Design Systems"},
        {"ticker": "CHTR", "company_name": "Charter Communications"},
        {"ticker": "KLAC", "company_name": "KLA Corp"},
        {"ticker": "ORLY", "company_name": "O'Reilly Automotive"},
        {"ticker": "FTNT", "company_name": "Fortinet"},
        {"ticker": "KDP", "company_name": "Keurig Dr Pepper"},
        {"ticker": "MAR", "company_name": "Marriott International MD"},
        {"ticker": "ABNB", "company_name": "Airbnb "},
        {"ticker": "KHC", "company_name": "Kraft Heinz Co/The"},
        {"ticker": "AEP", "company_name": "American Electric Power Co"},
        {"ticker": "NXPI", "company_name": "NXP Semiconductors NV"},
        {"ticker": "DXCM", "company_name": "Dexcom"},
        {"ticker": "CTAS", "company_name": "Cintas Corp"},
        {"ticker": "ADSK", "company_name": "Autodesk"},
        {"ticker": "PDD", "company_name": "PDD Holdings ADR"},
        {"ticker": "MCHP", "company_name": "Microchip Technology"},
        {"ticker": "AZN", "company_name": "AstraZeneca PLC ADR"},
        {"ticker": "IDXX", "company_name": "IDEXX Laboratories"},
        {"ticker": "EXC", "company_name": "Exelon Corp"},
        {"ticker": "PAYX", "company_name": "Paychex"},
        {"ticker": "BIIB", "company_name": "Biogen"},
        {"ticker": "LULU", "company_name": "Lululemon Athletica"},
        {"ticker": "WDAY", "company_name": "Workday"},
        {"ticker": "SGEN", "company_name": "Seagen"},
        {"ticker": "PCAR", "company_name": "PACCAR"},
        {"ticker": "GFS", "company_name": "GLOBALFOUNDRIES"},
        {"ticker": "ODFL", "company_name": "Old Dominion Freight Line"},
        {"ticker": "XEL",  "company_name": "Xcel Energy"},
        {"ticker": "MRVL", "company_name": "Marvell Technology"},
        {"ticker": "WBD", "company_name": "Warner Bros Discovery"},
        {"ticker": "CPRT", "company_name": "Copart"},
        {"ticker": "ROST", "company_name": "Ross Stores"},
        {"ticker": "ILMN", "company_name": "Illumina"},
        {"ticker": "EA", "company_name": "Electronic Arts"},
        {"ticker": "DLTR", "company_name": "Dollar Tree"},
        {"ticker": "CTSH", "company_name": "Cognizant Technology Solutions Corp"},
        {"ticker": "FAST", "company_name": "Fastenal Co"},
        {"ticker": "CRWD", "company_name": "Crowdstrike Holdings"},
        {"ticker": "VRSK", "company_name": "Verisk Analytics"},
        {"ticker": "WBA", "company_name": "Walgreens Boots Alliance"},
        {"ticker": "CSGP", "company_name": "CoStar Group"},
        {"ticker": "ANSS", "company_name": "ANSYS"},
        {"ticker": "BKR", "company_name": "Baker Hughes Co"},
        {"ticker": "MNST", "company_name": "Monster Beverage Corp"},
        {"ticker": "ENPH", "company_name": "Enphase Energy"},
        {"ticker": "CEG", "company_name": "Constellation Energy Corp"},
        {"ticker": "FANG", "company_name": "Diamondback Energy"},
        {"ticker": "ALGN", "company_name": "Align Technology"},
        {"ticker": "TEAM", "company_name": "Atlassian Corp"},
        {"ticker": "EBAY","company_name":  "eBay"},
        {"ticker": "DDOG", "company_name": "Datadog"},
        {"ticker": "JD", "company_name": "JD.com  ADR"},
        {"ticker": "ZM", "company_name": "Zoom Video Communications"},
        {"ticker": "ZS", "company_name": "Zscaler"},
        {"ticker": "LCID", "company_name": "Lucid Group"},
        {"ticker": "SIRI", "company_name": "Sirius XM Holdings"},
        {"ticker": "RIVN", "company_name": "Rivian Automotive"}
    ]

    for stock in stocks:
        db.session.add(Stock(
            ticker=stock['ticker'],
            company_name=stock['company_name']
        ))

    db.session.commit()


## unseed function
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
