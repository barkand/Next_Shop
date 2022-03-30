import logging
from logging.handlers import RotatingFileHandler


logging.basicConfig( \
    handlers=[RotatingFileHandler('../logs/shop.log', maxBytes=10000, backupCount=10)],
    format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s', \
    datefmt='%d-%b-%y %H:%M:%S', \
    level=logging.DEBUG, \
    )



def get_logger(name):
    return logging.getLogger(name)
