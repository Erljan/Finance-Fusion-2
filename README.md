## Creating the Finance Fusion App

### What is the finance fusion?
- It is a stock-tracker and budgeting app fused together
- Allows the user to see current stock prices with real time data
- Allows the user to add a stock to their watchlist 
- See a chart of the stock prices
- Create a budget for expenses
- Track expenses
- Get latest news related to specific stock

### Get Started
- Clone the repo
- Open the repo in an IDE
- Open terminal and cd to 'frontend'
    run
    ```
    npm install vite --save-dev
    ```
    then run
  ```
  npm run dev
  ```
- Open another terminal and create your database
  ```
  # Run this command below to go to postgres
  psql -U postgres
  
  # then inside psql
  CREATE DATABASE fusion_db
  ```
- Open another terminal and cd to 'backend'
  ```
  # Run these two commands to migrate your newly created database to the backend
  python manage.py makemigrations
  python manage.py migrate

  # Then run this to run the server
  python3 manage.py runserver
  ```
- The app should work on localhost

#### When the app is working
- Go to 'create an account'
- Then log in with your credentials
- Explore the features!

#### If it's not working
- You might need to cd to backend and run
  ```
  pip install requirements.txt
  ```

### Reminder
- The 'Latest News' on the main page will need an env file and store your own Finnhub API key for it to work
- The 'Ask AI' feature will also need your own OpenAI API key for it to work.
- This project was done in August 2024, so there might be a few errors and code that will need to be updated (I just haven't had time to look into this due to my internship)
- If you want to see the full demo of the overall project, go to https://youtu.be/Z1rv9NDgNbk 

<br/>
<br/>
<br/>

### Step by step guidelines on how I built this app

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
