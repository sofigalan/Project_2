from flask import Flask, render_template, redirect
from flask import jsonify
from flask_pymongo import PyMongo
import earth_quakes
import os

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/quake_app")





@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/data_quake<br/>"
    )


@app.route("/api/data_quake")
def scrape():

    # Run the scrape function
    quake_scrape = earth_quakes.last_quake()
  


    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, quake_scrape, upsert=True)
    

    # Redirect back to home page
    return jsonify(quake_scrape)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 80))
    app.run(host='0.0.0.0', port=port,debug=True)

