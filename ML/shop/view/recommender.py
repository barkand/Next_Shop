import requests
from decouple import config

from database.views import get_Ml_Models, updateIfExist_Ml_Models
from ..ML_Models.recommender import SerializeApriori, UnserializeApriori

serialized_name = 'recommender'


def UpdateRecommender():
    ordersList = requests.get(f"{config('API_PATH')}shop/v1/orders/all/").json()

    serialized = SerializeApriori(ordersList)
    updateIfExist_Ml_Models(serialized_name, serialized)

    return "Updated"



def GetRecommender(productIds):
    serialized = get_Ml_Models(serialized_name)
    _, rules = UnserializeApriori(serialized)

    recommendIds=[]
    rules_rhs = filter(lambda rule: len(rule.lhs) == 1 and len(rule.rhs) == 1, rules)

    for rule in sorted(rules_rhs, key=lambda rule: rule.lift):
        leftVal = int(float(rule.lhs[0]))
        rightVal = int(float(rule.rhs[0]))
        if ( leftVal in productIds and rightVal not in productIds):
            if(rightVal not in recommendIds):
                recommendIds.append(rightVal)

    return str(recommendIds)
