from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

def create_app():
    app = Flask(__name__)
    CORS(app)

    # MongoDB connection
    client = MongoClient("mongodb+srv://faizaharjumand2002_db_user:AYYBRcXBEdg4XNBO@cluster0.egx14ay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    db = client["donation_db"]

    # Attach db to app
    app.db = db

    return app
