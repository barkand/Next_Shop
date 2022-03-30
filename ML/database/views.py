from database import db
from .models import Ml_Models


def count_Ml_Models(title):
    return Ml_Models.query.filter_by(title = title).count()


def add_Ml_Models(title, pickle):
    db.session.add(Ml_Models(title=title, pickle=pickle))
    db.session.commit()


def update_Ml_Models(title, pickle):
    Ml_Models.query.filter_by(title = title).update({'pickle': pickle})
    db.session.commit()


def get_Ml_Models(title):
    return Ml_Models.query.filter_by(title = title).first().pickle


def get_all_Ml_Models():
    return Ml_Models.query.all()


def updateIfExist_Ml_Models(title, pickle):
    if count_Ml_Models(title) > 0:
        update_Ml_Models(title, pickle)
    else:
        add_Ml_Models(title, pickle)
