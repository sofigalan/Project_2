from flask import Flask, render_template, redirect
from flask import jsonify
from flask_pymongo import pymongo
from pymongo import MongoClient
import earth_quakes
import os

app = Flask(__name__)
client = pymongo.MongoClient("mongodb+srv://juan4545:123pentakill@cluster0-lomsa.mongodb.net/test?retryWrites=true&w=majority")
db = client.get_database('flask_mongodb_atlas')
user_collection = pymongo.collection.Collection(db, 'user_collection')


@app.route("/")
def welcome():
    quake_scrape = earth_quakes.last_quake()
    db.db.user_collection.update({}, quake_scrape, upsert=True)
    # Redirect back to home page
    return jsonify(quake_scrape)


@app.route("/")
def scrape():

    # Run the scrape function
    quake_scrape = earth_quakes.last_quake()
  


    # Update the Mongo database using update and upsert=True
    db.db.user_collection.update({}, quake_scrape, upsert=True)
    

    # Redirect back to home page
    return jsonify(quake_scrape)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 80))
    app.run(host='0.0.0.0', port=port,debug=True)

