from datetime import datetime
from database import db


class Ml_Models(db.Model):
    id = db.Column(db.Integer , primary_key=True, autoincrement=True)
    title = db.Column(db.String(80))
    pickle = db.Column(db.PickleType)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, title, pickle):
        self.title = title
        self.pickle = pickle



if __name__ == '__main__':
    db.create_all()

# db.create_all()