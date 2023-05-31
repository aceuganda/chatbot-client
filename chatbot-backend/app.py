import json
from flask import Flask ,jsonify
from flask.wrappers import Response
from flask.globals import request, session
import requests
from dotenv import load_dotenv
from werkzeug.exceptions import abort
from werkzeug.utils import redirect
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import os, pathlib
import google
#from models import User
#from connect_db import connect_db, insert_user_into_db
import jwt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc, or_
from sqlalchemy.sql import func
import datetime
from dateutil import parser
import psycopg2
import urllib.parse



app = Flask(__name__)
load_dotenv()
database_host = os.environ.get("DATABASE_HOST")
database_port = os.environ.get("DATABASE_PORT")
database_name = os.environ.get("DATABASE_NAME")
database_username = os.environ.get("DATABASE_USERNAME")
database_password = os.environ.get("DATABASE_PASSWORD")
encoded_password = urllib.parse.quote(database_password)
database_connection_string = f"postgresql://{database_username}:{encoded_password}@{database_host}:{database_port}/{database_name}"

SQLALCHEMY_DATABASE_URI = database_connection_string
CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'
app.config["Access-Control-Allow-Headers"]="Content-Type"
app.config['SQLALCHEMY_DATABASE_URI']=SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)

# bypass http
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
app.secret_key = os.getenv("SECRET_KEY")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
algorithm = os.getenv("ALGORITHM")
BACKEND_URL=os.getenv("BACKEND_URL")
FRONTEND_URL=os.getenv("FRONTEND_URL")



GLOBAL_USERS = ( """SELECT * FROM USERS;""" )

GLOBAL_CONVERSATIONS = (
    """SELECT * FROM conversation;"""
    
)

GLOBAL_CONVERSATIONS_EVENTS = (
    """
    SELECT data FROM conversation_event WHERE type_name IN ('user', 'bot') 
        AND conversation_id = %s ORDER BY timestamp
    """    
)


#database connection
#connect_db()

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri=BACKEND_URL+"/callback",
)


# wrapper
def login_required(function):
    def wrapper(*args, **kwargs):
        encoded_jwt=request.headers.get("Authorization").split("Bearer ")[1]
        if encoded_jwt==None:
            return abort(401)
        else:
            return function()
    return wrapper


def Generate_JWT(payload):
    encoded_jwt = jwt.encode(payload, app.secret_key, algorithm=algorithm)
    return encoded_jwt

def insert_user_into_db(username, email, picture):
     # check for existing user
    user = User.query.filter(
            or_(User.username == username)).first()
    if not user:
        new_user = User(username=username,email=email, picture= picture )
        db.session.add(new_user)
        db.session.commit()
        print({"_id": str(new_user.id) + str(new_user.username), "message": "User created"})
    else:
        print({"username": str(user.username), "message": "User already exists."})
        

@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    request_session = requests.session()
    token_request = google.auth.transport.requests.Request(session=request_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token, request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    session["google_id"] = id_info.get("sub")
    
    # removing the specific audience, as it is throwing error
    del id_info['aud']
    jwt_token=Generate_JWT(id_info)
    print('id info')
    print(id_info)

    
    insert_user_into_db(
        id_info.get('name'),
        id_info.get('email'),
        id_info.get('picture')
    )
    return redirect(f"{FRONTEND_URL}?jwt={jwt_token}")
    """ return Response(
        response=json.dumps({'JWT':jwt_token}),
        status=200,
        mimetype='application/json'
    ) """


@app.route("/auth/google")
def login():
    authorization_url, state = flow.authorization_url(prompt='consent')
    # Store the state so the callback can verify the auth server response.
    session["state"] = state
    return Response(
        response=json.dumps({'auth_url':authorization_url}),
        status=200,
        mimetype='application/json'
    )


@app.route("/logout")
def logout():
    #clear the local storage from frontend
    session.clear()
    return Response(
        response=json.dumps({"message":"Logged out"}),
        status=202,
        mimetype='application/json'
    )


@app.route("/home")
@login_required
def home_page_user():
    encoded_jwt=request.headers.get("Authorization").split("Bearer ")[1]
    try:
        decoded_jwt=jwt.decode(encoded_jwt, app.secret_key, algorithms=[algorithm,])
        print(decoded_jwt)
    except Exception as e: 
        return Response(
            response=json.dumps({"message":"Decoding JWT Failed", "exception":e.args}),
            status=500,
            mimetype='application/json'
        )
    return Response(
        response=json.dumps(decoded_jwt),
        status=200,
        mimetype='application/json'
    )

@app.get("/api/conversations")
def get_all_conversations():
    conversation_id = request.args.get('conversation_id')
    print(conversation_id)
    connection = psycopg2.connect(host=database_host, port = database_port,
     database=database_name, user=database_username, password=database_password)
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GLOBAL_CONVERSATIONS_EVENTS,(conversation_id,))
            conversations = cursor.fetchall()

            messages = []
            for row in conversations:
                data = json.loads(row[0])
                event_type = data['event']
                timestamp = data['timestamp']
                text = data['text']
                messages.append({'event': event_type, 'timestamp': timestamp, 'text': text})

            #return jsonify(messages)
            response_object = jsonify(messages)
             
    return  response_object  



class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=True, default='LOGGEDINWITHGOOGLE')
    picture= db.Column(db.String(), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self, username, email, picture):
        self.username = username
        self.email = email
        self.picture = picture    
        #self.password = password

    def update(self):
        db.session.commit()

    def to_json(self):
        return {
            'id': self.id, 
            'username':self.username,
            'email': self.email,       
            'picture': self.picture,
            'created_at':datetime.datetime.strftime(parser.parse(self.created_at.__str__()), format='%Y-%m-%d %H:%M:%S')
        }



if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
