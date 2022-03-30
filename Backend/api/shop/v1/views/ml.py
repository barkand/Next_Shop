import requests
from decouple import config

ml_Path = config('ML_PATH')

def getRecommenderProducts(productids):
    res = requests.get(f"{ml_Path}shop/v1/recommender/{productids}", verify=False).json()
   
    return list(res)
