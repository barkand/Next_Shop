import pandas as pd
import pickle
from efficient_apriori import apriori


def SerializeApriori(res):
    cardList = {order['id']: order['products'] for order in res}
    df = pd.DataFrame(cardList.values())

    transactions = [
        [
            str(df.values[i, j])
            for j in range(df.shape[1])
            if str(df.values[i, j]) != 'nan'
        ]
        for i in range(len(df))
    ]

    rules = apriori(transactions, min_support=0.2, min_confidence=0.5)

    return pickle.dumps(rules)



def UnserializeApriori(serialized):
    return pickle.loads(serialized)




if __name__ == '__main__':
    SerializeApriori()
