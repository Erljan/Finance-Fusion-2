# If you want to see the full demo 
- Please go to https://youtu.be/Z1rv9NDgNbk 
- To see my recent Hackathon project go to https://youtu.be/zU2zeMQDVNg

# Get Started
- Clone the repo
```
git clone https://github.com/Erljan/Finance-Fusion-2.git
```
- Open the repo in an IDE
- Open terminal and cd to Finance-Fusion-2
- Run
```
docker compose up
```
- **NOTE**: You will need to have a Finnhub and OpenAI API to access the AI and stocks news features. Otherwise, it will only have limited features.

### When the app is working
- Go to 'create an account'
- Then log in with your credentials
- Explore the features!
- When searching for stocks you have to use the stock symbol (example: MSFT, AAPL, TSLA)


### Reminder
- You will need to have your own Finnhub API to access news features on the main page
- The 'Ask AI' feature will also require your own OpenAI API key for it to function properly.
- This project was done in August 2024, so there might be a few errors in the console or in the code, but it should work (I just haven't had time to look into this due to my internship)

***ENJOY AND THANK YOU FOR REVIEWING MY PROJECT!*** 😊

# What is the finance fusion?
- It is a stock-tracker and budgeting app fused together
- Allows the user to see current stock prices with real-time data
- Allows the user to add a stock to their watchlist 
- See a chart of the stock prices
- Create a budget for expenses
- Track expenses
- Get the latest news related to a specific stock

### Problem this Fusion-Finance is solving
- Fusion Finance simplifies personal finance by bringing everything into one unified platform
  - ✅ Track stock prices and news without switching to finance apps like Yahoo Finance or Bloomberg.
  - ✅ Get financial guidance instantly with an integrated AI assistant—no need to open ChatGPT separately.
  - ✅ Create and manage budgets seamlessly, eliminating the need for Excel spreadsheets.
- By combining these features into a single app, Fusion Finance removes the hassle of context switching, helps users stay organized, and empowers them to make smarter financial decisions, all in one place.


<br/>
<br/>
<br/>

### Step-by-step guidelines on how I built this app

#### Practice Yfinance API
- Learn more about yfinance
- Learn how to use it to get real-time data
- Check out what it can do and what we can pull from it
- Then practice adding them to the model and store to database
```
pip install yfinance
```

### SQL Schema
<img width="935" alt="Screenshot 2024-08-18 at 7 34 56 PM" src="https://github.com/user-attachments/assets/57fa3e3d-9032-46c3-b116-80b78356af89">



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


### Step 8:
- Start building dashboard
- Add the watchlist, stock chart, transaction chart, and news


### Future Addition to the app
- Add a chart for the categories 
- Add a income tax calculator
- Add an algorithmic trading and see potential stock prices 
