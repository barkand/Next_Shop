from logging.handlers import RotatingFileHandler


def get_logger(name):
    import logging

    logging.basicConfig( \
        handlers=[RotatingFileHandler('logs/api/.log', maxBytes=10000, backupCount=10)],
        format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s', \
        datefmt='%d-%b-%y %H:%M:%S', \
        level=logging.DEBUG, \
        )

    return logging.getLogger(name)
