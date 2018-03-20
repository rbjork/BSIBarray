from flask import Flask, render_template
import random
from fake.Arcpy import Arcpy
from utils.templatecreate import *
import json
import os

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

def get_hello():
    greetings_list = ['Ciao', 'Hei', 'Salut', 'Hola', 'Hallo', 'Hej']
    return random.choice(greetings_list)

@app.route("/hello")
def hello():
    return get_hello()

@app.route("/getfields")
def getfields():
    print("getfields")
    fields = Arcpy.ListFields("temp_layer")
    return json.dumps(fields)

@app.route("/gettargets")
def gettargets():
    print("gettargets")
    targets = Arcpy.ListFields("temp_layer")
    return json.dumps(targets)


@app.route("/fieldmap")
def fieldmap():
    return render_template("fieldmap.html")

@app.route("/getfips")
def getfips():
    dirs = os.listdir('./BATCH_QUE')
    fips = [d for d in dirs if len(d) == 5 and d.isdigit()]
    print("fips",fips)
    return json.dumps(fips)


if __name__ == "__main__":
    #fillcolumn()
    arc = Arcpy()
    print(arc.listfields("temp_layer"))
    app.run(host="127.0.0.1", port=5000, threaded=True)
