import os
import sys
import json
from flask import Flask, request
from datetime import date, datetime
import pyrebase
from Utilities import *
from .auth.creds import config

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    today = date.today()
    # logging in firebase
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    db = firebase.database()

    @app.route('/flaskLogin', methods=['POST', 'GET'])
    def login():
        if request.method == 'POST':
            req = request.json
            try:
                user = auth.sign_in_with_email_and_password(req["email"], req["password"])                    
                user["auth"] = True
                return json.dumps(user)
            except:
                return json.dumps({"auth" : False})

    @app.route('/getName', methods=['POST', 'GET'])
    def getName():
        if request.method == 'POST':
            req = request.json
            all_users = db.child("users").get()
            if(all_users):
                for user in all_users.each():
                    if(user.val()['email']==req):
                        return json.dumps({'dname' : user.val()['name']})
            return null

    @app.route('/sendForm', methods=['POST', 'GET'])
    def receiveForm():
        if request.method == 'POST':
            try:
                req = request.json
                try:
                    info, data = Utilities.organizeFormFromRawFormInput(req)
                except:
                    print("ERROR")
                

                d4 = today.strftime("%b-%d-%Y")
                time = datetime.now()
                datetimeString = d4 + "|" + time.strftime("%H:%M:%S")

                if(info):
                    info['entries']={datetimeString : data} 
                    try:
                        db.child("users").push(info)
                    except:
                        print(sys.exc_info())
                else:
                    all_users = db.child("users").get()
                    for user in all_users.each():
                        if(user.val()["email"]==req["user"]["email"]):
                            cur_user=(db.child("users").child(user.key()).get()).val()
                            cur_user["entries"][datetimeString]=data
                            
                            db.child("users").child(user.key()).update(cur_user)
                    
                print("SUCCESS - Database written")  
                return json.dumps({"outcome": "SUCCESS"})
            except:
                return json.dumps({"outcome": "ERROR"})
    
    @app.route('/getHistory', methods=['POST', 'GET'])
    def getHistory():
        if request.method == 'POST':
            req = request.json
            try:
                all_users = db.child("users").get()
                for user in all_users.each():
                    if(user.val()["email"]==req["user"]["email"]):
                        cur_user=(db.child("users").child(user.key()).child("entries").get()).val()
                        return json.dumps(cur_user)
            except:
                print(sys.exc_info())

        return json.dumps({"outcome": "FAILURE"})
        
    return app

