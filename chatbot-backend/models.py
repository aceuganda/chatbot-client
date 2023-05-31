import datetime
from dateutil import parser
from app import db
from sqlalchemy.sql import func

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=True, default='LOGGEDINWITHGOOGLE')
    picture= db.Column(db.String(), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __init__(self, username, email,password, picture):
        self.username = username
        self.email = email
        self.picture = picture    
        self.password = password

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

