# Dinero (Robinhood-Clone)

Hi Welcome to Dinero, a clone of Robinhood built with a javascript/react frontend and python/flask backend. It's pulls real-time stock data using the [Polygon.io](https://polygon.io/) API.

View the site here: [Dinero.com](https://dinero.onrender.com/)

      * Log in using the Demo User account on the sign in page to use all the features.

## Technologies & Libraries Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-%23404d59.svg?style=for-the-badge&logo=flask&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Wiki
- [DB Schema](https://github.com/sbaeyens/robinhood-clone/wiki/DB-Schema)
- [Feature List](https://github.com/sbaeyens/robinhood-clone/wiki/Feature-List)
- [User Stories](https://github.com/sbaeyens/robinhood-clone/wiki/User-Stories) 


## Overview & Functionality:
**Note: You can log in using the Demo User to experience all of the sites features.**

### Account Signup and login:
**Note: You can log in using the Demo User to experience all of the sites features.
- Users can create a new account or sign in with an existing account.
- New users are given a $10,000 initial deposit on signup to purchase stocks.

### Home/User Portfolio:
- Users can view a history of their portfolio performance.
- Users have a side panel that contains all of the current stocks they own
- Users also can view their wishlists and the stocks on those lists
![rh-home](https://github.com/sbaeyens/robinhood-clone/assets/11000112/2c99dfd3-f5ec-44cb-bb24-b90b0801b591)

### Buy/Sell Stock:
**Note: You can log in using the Demo User to experience all of the sites features.
- Live stock data is pulled from the Polygon.io API
- Users can buy shares at it's current market price
- Users can sell shares at it's current market price
- A history of buy/sell transactions are kept underneath the stocks chart
- All purchases will be reflected on your portfolio
![rh-singlestockpage](https://github.com/sbaeyens/robinhood-clone/assets/11000112/62a37f7b-d33c-4984-a37c-4acfe005560f)

### Watchlists:
- Create, edit, or delete watchlists
- Add or remove stocks to watchlists
- View your watchlists and their stocks anytime from the home/portfolio page.
![rh-watchlists](https://github.com/sbaeyens/robinhood-clone/assets/11000112/d1290038-4293-4178-829d-f62ce65ca878)

### Transfers:
![rh-transfers](https://github.com/sbaeyens/robinhood-clone/assets/11000112/7426c7a5-25e5-4cb8-a25c-da47da597616)
- Add/deposit money (aka "buying power") to your account.
- Withdraw/remove money from your account.
- View a history of all your transfers.

### Search:
- Search any stock by company name or ticker

![rh-search](https://github.com/sbaeyens/robinhood-clone/assets/11000112/d9488b9a-5698-4c3f-93f1-53b4eda01f3a)


## Future Features/Updates:
- Additional data vizualization of shares/stocks in portfolio & past performance over time.
     - eg portfolio breakdown by sector  
- Dedicated page to manage wishlists.
