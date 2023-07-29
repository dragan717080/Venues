import json
from abc import ABC
from urllib.parse import urlparse, parse_qs

class Utils(ABC):

    @staticmethod
    def get_query_params_for_url(url):
        return parse_qs(urlparse(url).query)

    @staticmethod
    def format_coordinate(value, lat=True):
        if value < 0:
            direction = 'S' if lat else 'W'
        else:
            direction = 'N' if lat else 'E'
        return f'{round(abs(value), 3)}{direction}'

    @staticmethod
    def numeric_coordinate(value):
        direction = value[-1]
        value = value[:-1]
        return -float(value) if direction in ['S', 'W'] else float(value)
