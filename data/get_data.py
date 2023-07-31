import requests
from database_atlas import DatabaseAtlas
from utils import Utils
from dotenv import dotenv_values
from config.cities import CITIES
import json
import random

API_KEY = dotenv_values(".env")['OPENTRIPMAP_API_KEY']
GEONAMES_USERNAME = dotenv_values(".env")['GEONAMES_USERNAME']
BASE_URL='http://api.opentripmap.com/0.1/en'

def search_populations():

    for i in range(0, 9000, 500):
        URL = f'https://documentation-resources.opendatasoft.com/api/records/1.0/search'
        params = {
            'dataset': 'geonames-all-cities-with-a-population-1000',
            'sort': 'population',
            'start': i,
            'rows': 500
        }
        response = requests.get(URL, params=params)

        if response.status_code == 200:
            data = response.json()
            for record in data['records']:
                record['fields']['digital_elevation_model'] = record['fields']['dem']
                record['fields']['coordinates'] = [Utils.format_coordinate(value) if i == 0 else Utils.format_coordinate(value, False) for i, value in enumerate(record['fields']['coordinates'])]
                record['fields'] = {k: v for k, v in record['fields'].items() if k not in ['feature_class', 'feature_code', 'modification_date', 'admin1_code', 'admin2_code', 'admin3_code', 'geoname_id', 'dem', 'cou_name_en']}
                DatabaseAtlas.insertOne('populations', record['fields'])

        else:
            print(f"Error occurred: {response.status_code}")
            break

def get_random_city_images():
    d = {}
    for city in CITIES:
        result = requests.get(f"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles={city}").json()
        try:
            page_id = list(result['query']['pages'].keys())[0]
            d[city] = result['query']['pages'][page_id]['original']['source']
        except Exception as e:
            continue
    with open('config/random_cities_images.json', 'w') as f:
        json.dump(d, f)

def get_images_for_cities():
    for item in DatabaseAtlas.findAll('populations')[::-1]:
        try:
            result = requests.get(f"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles={item['ascii_name']}").json()
            page_id = list(result['query']['pages'].keys())[0]
            DatabaseAtlas.updateOne('populations', {'ascii_name': item['ascii_name']}, {'img': result['query']['pages'][page_id]['original']['source']})
        except Exception as e:
            print(f"Exception occurred for city {item['ascii_name']}: {e}")
            if e == 'original':
                DatabaseAtlas.updateOne('populations', {'ascii_name': item['ascii_name']}, {'img': 'https://upload.wikimedia.org/wikipedia/commons/9/96/ISH_WC_Boston4.jpg'})
            continue

def update_images_for_cities():
    with open('config/random_cities_images.json', 'r') as f:
        random_images = list(json.load(f).values())
    for item in DatabaseAtlas.findAll('populations')[::-1]:
        try:
            result = requests.get(f"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles={item['ascii_name']}").json()
            page_id = list(result['query']['pages'].keys())[0]
            DatabaseAtlas.updateOne('populations', {'ascii_name': item['ascii_name']}, {'img': result['query']['pages'][page_id]['original']['source']})
        except Exception as e:
            print(f"Exception occurred for city {item['ascii_name']}: {e}")
            DatabaseAtlas.updateOne('populations', {'ascii_name': item['ascii_name']}, {'img': random.choice(random_images)})
            continue

if __name__ == "__main__":

    c = 'populations'
    print(DatabaseAtlas.lenAll('Population'))

