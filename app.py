from flask import Flask, request, url_for, jsonify
from flask import render_template
import pymongo
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS

from collections import defaultdict


app = Flask(__name__)
CORS(app)


MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'NHL_stats'
COLLECTION_NAME = 'all_results.info'
FIELDS = {}

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'NHL_stats'
COLLECTION_NAME1 = 'yearly_results.info'
FIELDS = {}

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'NHL_stats'
COLLECTION_NAME2 = 'vs_results.info'
FIELDS = {}

@app.route("/")
def index():
    return render_template("yearSearch.html")

@app.route("/vs")
def vs():
    return render_template("vsSearch.html")

@app.route("/info")
def info():
    return render_template("info.html")

@app.route("/teamSearch")
def teamSearch():
    return render_template("authorSearch.html")



@app.route("/nyt/jsondata")
def nyt_jsondata():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

@app.route("/nyt/jsondatas")
def nyt_jsondatas():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME2]
    projects = collection.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects


@app.route("/nyt/titlelist")
def nyt_titlelist():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME1]
    projects = collection.find()
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects





if __name__ == "__main__":
    app.run(debug=True)