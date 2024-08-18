## Creating the Finance Fusion App

### What is the finance fusion?
- Allows the user to see current stock prices with real time data
- Allows the user to add a stock to their watchlist 
- See a chart of the stock prices


#### Practice Yfinance API
- Learn more about yfinance
- Learn how to use it to get real-time data
- Checkout what it can do and what we can pull from it
- Then practice adding them to the model and store to database
```
pip install yfinance
```

### SQL Schema
<img width="935" alt="Screenshot 2024-08-18 at 7 34 56 PM" src="https://github.com/user-attachments/assets/57fa3e3d-9032-46c3-b116-80b78356af89">


#### Practice rechart/flowbite
- Watch youtube videos/read docs and practice implementing them
- practice frontend seeing the stock prices in real time
- practice using chart using flowbite


## Step 1:
- Create our Django backend
- Create the django project
```bash
# Terminal
django-admin startproject backend
```
- Then create an app 
```
python manage.py startapp stock_app
```
- Configure the settings
- Install DRF and import dependencies
- Change to postgres



## Step 2:
- Setup authentication


## Step 3:
- Build the models and the views for the app
- Store stock symbols to the database and use those as the ticker to call information on stock
- Create a model for the stocks and watchlist


### Step 4: 
- Build the frontend with react
- Have an input field to add stock to the watchlist
- Add an "add" button to add to the watchlist and it saves into the database
- Use a setInterval to keep getting the stock price


### Step 5:
- Using the saved data in the database, create a chart for the stocks


### Step 6:
- Create the budget page
- Create another django app for budget
- Create views for the models
- Do the Urls


### Step 7:
- Add the functionalities for the budget
- Create charts
