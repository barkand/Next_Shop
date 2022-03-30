from flask import jsonify
from database import app
from shop.view.recommender import GetRecommender, UpdateRecommender


routes = [
    '/api/shop/v1/recommender/',
    '/api/shop/v1/recommender/<product_ids>',
]


@app.route("/")
def home():
    return jsonify(routes)



@app.route("/api/shop/v1/recommender/", methods = ['GET'])
def update_recommender_model():
    return UpdateRecommender()
    
    
@app.route("/api/shop/v1/recommender/<product_ids>", methods = ['GET'])
def get_recommender_model(product_ids):
    productIds = [int(i) for i in product_ids.split(',')]

    return GetRecommender(productIds)
