from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from decouple import config


app = Flask(__name__)
app.secret_key = config('SECRET_KEY')

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql://{config('DB_USER')}:{config('DB_PASSWORD')}@{config('SERVER_NAME')}/{config('DATABASE_NAME')}"


db = SQLAlchemy(app)
