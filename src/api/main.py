from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

# CORS (Cross-Origin Resource Sharing) configuration
origins = ["*"]

# MySQL database connection configuration
db_config = {
    "host": "localhost",
    "user": "thinhpham1807",
    "password": "@Bin040718",
    "database": "mydb"
}

# Middleware to handle CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to create tables in the database
def create_tables():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to drop existing tables
        query = "DROP TABLE IF EXISTS transactions, assets, accounts"
        cursor.execute(query)

        # Define the SQL query to create the accounts table
        query = "CREATE TABLE IF NOT EXISTS accounts (accountid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"
        cursor.execute(query)

        # Define the SQL query to create the assets table
        query = "CREATE TABLE IF NOT EXISTS assets (assetID INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, owner INT, img VARCHAR(255) NOT NULL, price FLOAT NOT NULL, tokenID VARCHAR(20) NOT NULL, contract_address VARCHAR(20) NOT NULL)"
        cursor.execute(query)

        # Define the SQL query to create the transactions table
        query = "CREATE TABLE IF NOT EXISTS transactions (transID INT AUTO_INCREMENT PRIMARY KEY, accountID INT NOT NULL, name VARCHAR(255) NOT NULL, price FLOAT NOT NULL, mode VARCHAR(10) NOT NULL, date DATE NOT NULL, tokenID VARCHAR(20) NOT NULL, FOREIGN KEY (accountID) REFERENCES accounts(accountid))"
        cursor.execute(query)

        # Commit the changes
        connection.commit()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        # Call the function to insert data into tables
        initialize_database()

        return {"success": "Tables created successfully"}

    except mysql.connector.Error as err:
        # Handle database errors
        return {"error": f"Database error: {err}"}

# Function to initialize database with data
def initialize_database():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL commands
        cursor = connection.cursor()

        # SQL commands for inserting data into tables
        insert_data_query = """
        INSERT INTO accounts (username, password) VALUES
        ('Yasuo', '123'),
        ('Yone', '123'),
        ('Yi', '123'),
        ('Zed', '123'),
        ('Leesin', '123'),
        ('Nautilus', '123'),
        ('Ryze', '123'),
        ('Ahri', '123'),
        ('Akali', '123'),
        ('Ashe', '123');

        INSERT INTO assets (name, owner, img, price, tokenID, contract_address) VALUES
        ('Yellow Bear', NULL, '/image/bear.png', 0.25, '0xF1E2D3C4B5A', '0x5F4E3D2C1A0'),
        ('Blue Dog', NULL, '/image/blue-dog.png', 0.35, '0xA1B2C3D4E5F', '0xC1D2E3F4A5B'),
        ('Blue Elephant', NULL, '/image/blue-elephant.png', 0.65, '0xB1A2C3D4E5F', '0x6F5E4D3C2B1'),
        ('Cool Dog', NULL, '/image/cool-dog.png', 0.45, '0x1F2E3D4C5B6', '0xA0B1C2D3E4F'),
        ('Glasses Elephant', NULL, '/image/glasses-elephant.png', 0.75, '0xF2E1D0C9B8A', '0x2F3E4D5C6B7'),
        ('Green Dog', NULL, '/image/green-dog.png', 0.85, '0xCBA987654321', '0xFEDCBA987654'),
        ('Monster', NULL, '/image/monster.png', 0.55, '0xF0E1D2C3B4A', '0x9E8F7D6C5B4'),
        ('One eye Dog', NULL, '/image/one-eye-dog.png', 0.65, '0x4E5F6D7C8B9', '0x2A1B3C4D5E6'),
        ('Pink Dog', NULL, '/image/pink-dog.png', 0.45, '0x6B5A4C3D2E1', '0xE7F8D9A0B1C'),
        ('Pink Penguin', NULL, '/image/pink-penguin.png', 0.55, '0x1A2B3C4D5E6', '0x6F7E8D9A0B1'),
        ('Red Penguin', NULL, '/image/red-penguin.png', 0.75, '0xA0B1C2D3E4F5', '0x9A8B7C6D5E4'),
        ('White one eye Dog', NULL, '/image/white-one-eye-dog.png', 0.85, '0xA9876543210F', '0x0E1D2C3B4A5');

        INSERT INTO transactions (accountID, name, price, mode, date, tokenID) VALUES
        (1, 'Yellow Bear', 0.25, 'Buy', '2024-01-01', '0xF1E2D3C4B5A'),
        (2, 'Blue Dog', 0.35, 'Buy', '2024-01-15', '0xA1B2C3D4E5F'),
        (6, 'Blue Elephant', 0.65, 'Sell', '2024-01-30', '0xB1A2C3D4E5F'),
        (4, 'Cool Dog', 0.45, 'Buy', '2024-01-01', '0x1F2E3D4C5B6'),
        (5, 'Glasses Elephant', 0.75, 'Buy', '2024-02-01', '0xF2E1D0C9B8A'),
        (7, 'Green Dog', 0.85, 'Sell', '2024-02-03', '0xCBA987654321'),
        (8, 'One eye Dog', 0.65, 'Buy', '2024-02-04', '0x4E5F6D7C8B9'),
        (10, 'Monster', 0.55, 'Sell', '2024-02-06', '0xF0E1D2C3B4A'),
        (9, 'Pink Dog', 0.45, 'Buy', '2024-02-14', '0x6B5A4C3D2E1'),
        (3, 'White one eye Dog', 0.85, 'Buy', '2024-02-24', '0xA9876543210F');
        """

        # Split the SQL commands and execute them separately
        for command in insert_data_query.split(";"):
            if command.strip():  # Skip empty commands
                cursor.execute(command)

        # Commit the changes
        connection.commit()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return {"success": "Data inserted into tables"}

    except mysql.connector.Error as err:
        # Handle database errors
        return {"error": f"Database error: {err}"}
# Call the function to create tables and insert data
create_tables()

# Model for login credentials
class Login(BaseModel):
    username: str
    password: str

# Endpoint for user login
@app.post("/accounts")
def login_user(login: Login):
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve user based on username and password
        query = "SELECT username FROM accounts WHERE username = %s AND password = %s"
        cursor.execute(query, (login.username, login.password))

        # Fetch the first row (if any)
        user = cursor.fetchone()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        # If user is found, return success message with username
        if user:
            return {"message": "Login successful", "username": user[0]}
        else:
            # If user is not found, raise HTTPException with 401 status code
            raise HTTPException(status_code=401, detail="Invalid credentials")

    except mysql.connector.Error as err:
        # Handle database errors
        return {"error": f"Database error: {err}"}

# Model for NFT asset
class Asset(BaseModel):
    assetID: int
    name: str
    owner: int
    img: str
    price: float
    tokenID: str
    contract_address: str

# Endpoint to retrieve all NFT assets
@app.get("/assets")
def get_assets():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor(dictionary=True)

        # Define the SQL query to retrieve all NFT assets
        query = "SELECT * FROM assets"
        cursor.execute(query)

        # Fetch all rows
        assets = cursor.fetchall()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        # Return the list of assets
        return assets

    except mysql.connector.Error as err:
        # Handle database errors
        return {"error": f"Database error: {err}"}
    
@app.get("/details")
def get_assets():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor(dictionary=True)

        # Define the SQL query to retrieve all NFT assets
        query = "SELECT * FROM assets"
        cursor.execute(query)

        # Fetch all rows
        assets = cursor.fetchall()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        # Return the list of assets
        return assets

    except mysql.connector.Error as err:
        # Handle database errors
        return {"error": f"Database error: {err}"}

# Endpoint to retrieve all transactions
@app.get("/transactions")
def get_transactions():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor(dictionary=True)

        # Define the SQL query to retrieve all transactions
        query = "SELECT * FROM transactions"
        cursor.execute(query)

        # Fetch all rows
        transactions = cursor.fetchall()

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        # Return the list of transactions
        return transactions

    except mysql.connector.Error as err:
        # Handle database errors
        return {"error": f"Database error: {err}"}