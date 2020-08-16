import os
import sys
import json
from flask import Flask, request
import pyrebase
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

    @app.route('/hello')
    def hello():
        return json.dumps({"text": "Hello guys"})

    return app

