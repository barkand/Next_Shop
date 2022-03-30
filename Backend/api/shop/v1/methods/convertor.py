from django.conf import settings


def persian_numeric(num : int) -> str:
    return str(num).replace('1', '۱').replace('2', '۲').replace('3', '۳').replace('4', '۴').replace('5', '۵')\
        .replace('6', '۶').replace('7', '۷').replace('8', '۸').replace('9', '۹').replace('0', '۰').replace(',', '٫').replace('%', '٪')


def to_price(price : int) -> str:   
    return f'{price:,}'


def filter_fields(serializer, filter):
    for field in set(list(serializer)) - set(filter):
        del serializer[field]
    return serializer


def off_percent(price : int, offPrice : int) -> str:
    return f'{round((price - offPrice) / price * 100)}%'


def curr_price(lang : str, price : int) -> int:
    return int(price) * int(settings.USD_TO_IRR) if lang == 'fa' else int(price)

def currb_price(lang : str, price : int) -> int:
    return int(price) / int(settings.USD_TO_IRR) if lang == 'fa' and int(price) > int(settings.USD_TO_IRR) else int(price)
